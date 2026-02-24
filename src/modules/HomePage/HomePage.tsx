import React from 'react';

import styles from './HomePage.module.scss';
import { Hero } from './Hero';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
        <Hero />
      </div>
    </main>
  );
};
