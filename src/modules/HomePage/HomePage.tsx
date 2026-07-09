import styles from './HomePage.module.scss';
import { BannerSlider } from '../../components/BannerSlider';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../features/types/productType';
import { getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductsCarousel } from '../../components/ProductsCarousel';
import { CategoryCard } from '../../components/categoryCard';
import { categories } from '../../features/constants/categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categoryCounts = useMemo(() => {
    return products.reduce(
      (acc, p) => ({
        ...acc,
        [p.category]: acc[p.category] + 1,
      }),
      { phones: 0, tablets: 0, accessories: 0 },
    );
  }, [products]);

  const newestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 30);
  }, [products]);

  const bestDeals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      })
      .slice(0, 30);
  }, [products]);

  return (
    <div className={styles.home}>
      <h1 className={styles.home__titleHiden}>Product Catalog</h1>
      <h2 className={styles.home__title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.home__content}>
        <section className={styles.home__banner}>
          <BannerSlider />
        </section>
        {loading && <Loader />}

        {error && !loading && (
          <div className={styles.home__error}>
            <p>Something went wrong</p>
            <button type="button" onClick={loadProducts}>
              Reload
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className={styles.home__newest}>
              <ProductsCarousel
                title="Brand new models"
                products={newestProducts}
              />
            </section>

            <section className={styles.home__categories}>
              <h2 className={styles.home__categoriesTitle}>Shop by category</h2>
              <div className={styles.home__categoriesList}>
                {categories.map(category => (
                  <CategoryCard
                    key={category.key}
                    category={category}
                    count={categoryCounts[category.key]}
                  />
                ))}
              </div>
            </section>

            <section className={styles.home__hotPrices}>
              <ProductsCarousel
                title="Hot prices"
                products={bestDeals}
                showDiscount
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};
