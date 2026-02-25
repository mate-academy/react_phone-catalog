import React from 'react';

import styles from './HomePage.module.scss';
import { Hero } from './Hero';
import { ProductCard } from '../../components/ProductCard';

//---TEMP---//
const sampleProduct = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-14-128gb-blue',
  name: 'Apple iPhone 14 128GB Blue',
  fullPrice: 999,
  price: 899,
  screen: '6.1" OLED',
  capacity: '128GB',
  color: 'blue',
  ram: '6GB',
  year: 2022,
  image: 'img/phones/apple-iphone-11/white/00.webp',
};

export const HomePage: React.FC = () => {
  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
        <Hero />
        <ProductCard product={sampleProduct} />
      </div>
    </main>
  );
};
