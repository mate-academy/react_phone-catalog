import React from 'react';
import styles from './MainContent.module.scss';
import { Swiper } from '../HomePage/Swiper';
import { NewModels } from '../HomePage/NewModels';
import { ShopByCategory } from '../HomePage/ShopByCategory';
import { HotPrices } from '../HomePage/HotPrices';
import { Footer } from '../Footer';
import { NavBar } from '../../shared/NavBar';

export const MainContent: React.FC = () => {
  return (
    <>
      <NavBar />
      <header className={styles.header}>
        <h1 className={styles.header_title}>Welcome to Nice Gadgets store!</h1>

        <Swiper />
      </header>

      <div className={styles.content}>
        <NewModels />
        <ShopByCategory />
        <HotPrices />
      </div>
      <Footer />
    </>
  );
};
