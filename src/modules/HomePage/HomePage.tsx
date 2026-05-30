import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import {
  fetchListProducts,
  getHotProducts,
  getNewestProducts,
} from '../../services/products';
import { ProductsSlider } from './components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { CategoryLinks } from './components/CategoryLinks';
import { getAssetPath } from '../../utils/assets';
import styles from './HomePage.module.scss';
import type { Product } from '../../types';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchListProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.empty}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  const hotProducts = getHotProducts(products, 8);
  const newestProducts = getNewestProducts(products, 8);
  const slides = [
    getAssetPath('img/banner-phones.png'),
    getAssetPath('img/banner-tablets.png'),
    getAssetPath('img/banner-accessories.png'),
  ];

  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <section className={styles.hero}>
        <PicturesSlider images={slides} />
      </section>
      <section className={styles.section}>
        <div className={styles.titleBlock}>
          <h2>Hot prices</h2>
        </div>
        <ProductsSlider title="Hot prices" products={hotProducts} />
      </section>
      <section className={styles.section}>
        <div className={styles.titleBlock}>
          <h2>Shop by category</h2>
        </div>
        <CategoryLinks />
      </section>
      <section className={styles.section}>
        <div className={styles.titleBlock}>
          <h2>Brand new</h2>
        </div>
        <ProductsSlider title="Brand new" products={newestProducts} />
      </section>
    </main>
  );
};
