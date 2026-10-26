import { useEffect, useState, useMemo } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Hot Prices: товари з найбільшими знижками на початку
  const hotPrices = useMemo(() => {
    return [...products].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
  }, [products]);

  // Brand New: найновіші товари, показуємо fullPrice
  const brandNew = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={`container ${styles.pageWrapper}`}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.section}>
        <PicturesSlider />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </section>

      <section className={styles.section}>
        <ShopByCategory products={products} />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Brand new" products={brandNew} showFullPrice />
      </section>
    </main>
  );
};
