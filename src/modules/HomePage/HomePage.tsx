import React from 'react';

import styles from './HomePage.module.scss';
import { Hero } from './Hero';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrices } from '../../components/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
        <Hero />
        <ProductsSlider title="Brand new models" />
        <ShopByCategory />
        <HotPrices title="Hot Prices" />
      </div>
    </main>
  );
};
