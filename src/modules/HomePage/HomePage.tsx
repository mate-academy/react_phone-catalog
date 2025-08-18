import React from 'react';
import styles from './HomePage.module.scss';
import { useAllProducts } from '../../hooks/useAllProducts';
import { PictureSlider } from './component/PictureSlider';
import { CategoryTiles } from './component/CategoryTiles/CategoryTiles';
import { HotPricesSlider } from './component/HotPricesSlider';
import { BrandNewSlider } from './component/BrandNewSlider/BrandNewSlider';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useAllProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <section className={styles.sliderSection}>
        <PictureSlider />
      </section>

      <section className={styles.section}>
        <BrandNewSlider products={products} />
      </section>

      <section className={styles.section}>
        <CategoryTiles />
      </section>

      <section className={styles.section}>
        <HotPricesSlider products={products} />
      </section>
    </div>
  );
};
