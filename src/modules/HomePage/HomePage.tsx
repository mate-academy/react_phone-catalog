import React from 'react';
import styles from './HomePage.module.scss';
import HomeBanner from './components/HomeBanner/HomeBanner';
import Brands from './components/Brands/Brands';
import Categorys from './components/Categorys/Categorys';
import HotPrices from './components/HotPrices/HotPrices';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.main__content}>
        <HomeBanner />

        <Brands />

        <Categorys />

        <HotPrices />
      </div>
    </main>
  );
};

export default HomePage;
