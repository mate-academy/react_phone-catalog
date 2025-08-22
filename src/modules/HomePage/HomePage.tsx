import React from 'react';
import { AdsBanner } from './components/AdsBanner';
import { NewModelsSlider } from './components/ProductSliders/NewModelsSlider';
import { HotPricesSlider } from './components/ProductSliders/HotPricesSlider';
import { CategoryGrid } from './components/CategoryGrid';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.home}>
      <h1 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.home__section}>
        <AdsBanner />
      </section>

      <section className={styles.home__section}>
        <NewModelsSlider />
      </section>

      <section className={styles.home__section}>
        <h2 className={styles.section__title}>Shop by category</h2>

        <CategoryGrid />
      </section>

      <section className={styles.home__section}>
        <HotPricesSlider />
      </section>
    </main>
  );
};
