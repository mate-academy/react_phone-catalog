import { useState, useEffect } from 'react';
import type { Product } from '../shared/types/Product';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { getHotPriceProducts, getNewProducts } from '../shared/api/products';
import { Loader } from '../shared/components/Loader';
import styles from './HomePage.module.scss';

export function HomePage(): JSX.Element {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [hot, newProductsData] = await Promise.all([
          getHotPriceProducts(),
          getNewProducts(),
        ]);

        setHotProducts(hot.slice(0, 8));
        setNewProducts(newProductsData.slice(0, 8));
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h2>
        </div>
      </section>
      <div className={styles.container}>
        <PicturesSlider />
        {loading ? (
          <Loader />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <ProductsSlider title="Brand new models" products={newProducts} />
            <ShopByCategory />
            <ProductsSlider title="Hot prices" products={hotProducts} />
          </>
        )}
      </div>
    </main>
  );
}
