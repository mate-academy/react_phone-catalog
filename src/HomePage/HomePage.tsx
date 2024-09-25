import React from 'react';
import styles from '../HomePage/HomePage.module.scss';
import { PicturesSlider } from '../PicturesSlider/PicturesSlider';
import { BrandNewModels } from '../BrandNewModels/BrandNewModels';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { HotPrices } from '../HotPrices/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p className={styles.header__paragraph}>
          Welcome to Nice Gadgets store!
        </p>
      </div>
      <PicturesSlider />
      <BrandNewModels />
      <ShopByCategory />
      <HotPrices />
    </header>
  );
};
