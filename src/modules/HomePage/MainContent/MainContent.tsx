import React from 'react';
import styles from './MainContent.module.scss';
import { NavBar } from '../../../shared/NavBar';
import { Swiper } from '../Swiper';
import { NewModels } from '../NewModels';
import { ShopByCategory } from '../ShopByCategory';
import { HotPrices } from '../HotPrices';
import { Footer } from '../../Footer';

export const MainContent: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.header_title}>
            Welcome to Nice Gadgets store!
          </h1>
          <Swiper />
        </header>
        <div className={styles.content}>
          <NewModels />
          <ShopByCategory />
          <HotPrices />
        </div>
      </div>
      <div className={styles.underline}></div>
      <Footer />
    </>
  );
};
