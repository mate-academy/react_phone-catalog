import React from 'react';
import { HomePageSlider } from '../../components/HomePageSlider/HomePageSlider';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CategoryCards } from '../../components/Categories';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer/Footer';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>
        <div className={styles.main__wrapper}>
          <HomePageSlider />
          <ProductsSlider />
          <CategoryCards />
          <ProductsSlider />
        </div>
      </main>
      <Footer />
    </div>
  );
};
