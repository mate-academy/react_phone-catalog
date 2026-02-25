import React from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <div className="container">
        <h1 className={styles.homePageTitle}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.picturesSlider}>
        <PicturesSlider />
      </div>

      <div className="container">
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
          {/* <ProductsSlider /> */}
        </div>
      </div>
    </main>
  );
};
