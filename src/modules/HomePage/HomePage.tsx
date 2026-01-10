import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from '../../components/Container';
import { Button } from '../shared/components/Button';
import { CategoryTile } from '../shared/components/CategoryTile';
import { EmptyState } from '../shared/components/EmptyState';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { getProducts } from '../shared/api/products';
import { Product } from '../shared/types';
import { HomePageSkeleton } from './components/HomePageSkeleton';
import styles from './HomePage.module.scss';

const slides = [
  {
    src: '/img/banner-phones.png',
    title: 'Iconic smartphones',
    description: 'Carefully curated models to fit every moment of your day.',
  },
  {
    src: '/img/banner-tablets.png',
    title: 'Tablets that feel alive',
    description: 'Powerful displays, great battery life, and playful colors.',
  },
  {
    src: '/img/banner-accessories.png',
    title: 'Accessories that spark joy',
    description: 'Dress your tech with chargers, cases, and headphones.',
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getProducts();

      setProducts(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const hotProducts = useMemo(
    () =>
      [...products]
        .filter(product => product.fullPrice - product.price > 0)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
    [products],
  );

  const brandNew = useMemo(
    () => [...products].sort((a, b) => b.year - a.year),
    [products],
  );

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <>
      <PicturesSlider slides={slides} />

      <Container className={styles.page}>
        <h1 className="visually-hidden">Product Catalog</h1>

        {loading && <HomePageSkeleton />}

        {error && (
          <EmptyState
            title="Something went wrong"
            description="We could not load the catalog. Please try again."
            action={
              <Button onClick={fetchProducts} variant="primary">
                Reload
              </Button>
            }
          />
        )}

        {!loading && !error && (
          <div className={styles.container}>
            {brandNew.length > 0 && (
              <ProductsSlider title="Brand new models" products={brandNew} />
            )}

            <section className={styles.block}>
              <div className={styles.sectionHeader}>
                <h2>Shop by category</h2>
              </div>
              <div className={styles.categories}>
                <CategoryTile
                  title="Mobile phones"
                  to="/phones"
                  image="/img/category-phones.webp"
                  description={`${phonesCount} models`}
                />
                <CategoryTile
                  title="Tablets"
                  to="/tablets"
                  image="/img/category-tablets.webp"
                  description={`${tabletsCount} models`}
                />
                <CategoryTile
                  title="Accessories"
                  to="/accessories"
                  image="/img/category-accessories.webp"
                  description={`${accessoriesCount} picks`}
                />
              </div>
            </section>

            {hotProducts.length > 0 && (
              <ProductsSlider
                title="Hot prices"
                products={hotProducts}
                hotPrice={true}
              />
            )}
          </div>
        )}
      </Container>
    </>
  );
};
