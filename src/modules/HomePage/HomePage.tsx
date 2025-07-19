import React from 'react';

import { PicturesSlider } from './components/PicturesSlider';
import { Novelties } from './components/Novelties';
import { HotPrices } from './components/HotPrices';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product catalog</h1>

      <PicturesSlider />

      <div className={styles.section}>
        <Novelties />
      </div>

      <div className={styles.section}>
        <ShopByCategory />
      </div>

      <div className={styles.section}>
        <HotPrices />
      </div>
    </main>
  );
};
