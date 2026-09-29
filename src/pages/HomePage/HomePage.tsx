import React, { useMemo } from 'react';
import { publicPath } from '../../utils/publicPath';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useFetch } from '../../hooks/useFetch';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/product.types';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CategoryCard } from '../../components/CategoryCard';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import './HomePage.scss';

const categories = [
  {
    title: 'Mobile phones',
    category: 'phones',
    image: publicPath('/img/category-phones.webp'),
  },
  {
    title: 'Tablets',
    category: 'tablets',
    image: publicPath('/img/category-tablets.webp'),
  },
  {
    title: 'Accessories',
    category: 'accessories',
    image: publicPath('/img/category-accessories.webp'),
  },
] as const;

export const HomePage: React.FC = () => {
  useDocumentTitle('Nice Gadgets');
  const {
    data: products,
    isLoading,
    error,
  } = useFetch<Product[]>(publicPath('/api/products.json'));
  const { favouriteIds, cartIds, toggleFavourite, addToCart } = useShop();

  const brandNewModels = useMemo(() => {
    if (!products) {
      return [];
    }

    const latestYear = Math.max(...products.map(product => product.year));

    return products.filter(product => product.year === latestYear);
  }, [products]);

  const hotPrices = useMemo(() => {
    if (!products) {
      return [];
    }

    return products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    products?.forEach(product => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    });

    return counts;
  }, [products]);

  return (
    <div className="home-page">
      <h1 className="home-page__hidden-title">Product Catalog</h1>
      <h2 className="home-page__title">Welcome to Nice Gadgets store!</h2>

      <Banner />

      {isLoading && <Loader />}
      {error && <ErrorMessage message="Failed to load products" />}

      {!isLoading && !error && (
        <>
          <section className="home-page__section">
            <ProductsSlider
              title="Brand new models"
              products={brandNewModels}
              favouriteIds={favouriteIds}
              cartIds={cartIds}
              onToggleFavourite={toggleFavourite}
              onAddToCart={addToCart}
            />
          </section>

          <section className="home-page__section">
            <h2 className="home-page__section-title">Shop by category</h2>

            <div className="home-page__categories">
              {categories.map(item => (
                <CategoryCard
                  key={item.category}
                  title={item.title}
                  count={categoryCounts[item.category] ?? 0}
                  image={item.image}
                  to={`/${item.category}`}
                />
              ))}
            </div>
          </section>

          <section className="home-page__section">
            <ProductsSlider
              title="Hot prices"
              products={hotPrices}
              favouriteIds={favouriteIds}
              cartIds={cartIds}
              onToggleFavourite={toggleFavourite}
              onAddToCart={addToCart}
            />
          </section>
        </>
      )}
    </div>
  );
};
