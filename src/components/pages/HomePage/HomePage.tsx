import React from 'react';
import { MainSlider } from './components/MainSlider';
import { NewProductsSlider } from './components/NewProductsSlider';
import { Category } from './components/Categories/Categories';
import { HotPricesSlider } from './components/HotPricesSlider/HotPricesSlider';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__content}>
        <h1 className={styles.home__title}>Product Catalog</h1>
        <section className={styles.home__section}>
          <MainSlider />
        </section>

        <section className={styles.home__section}>
          <NewProductsSlider />
        </section>

        <section className={styles.home__section}>
          <h2 className={styles.section__title}>Shop by category</h2>
          <Category />
        </section>

        <section className={styles.home__section}>
          <HotPricesSlider />
        </section>
      </div>
    </div>
  );
};
