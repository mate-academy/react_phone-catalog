import React from 'react';
import styles from './HomePage.module.scss';
import { Hero } from '../components/Hero';

export const HomePage = () => {
  return (
    <main className={styles['home-page']}>
      <Hero />
    </main>
  );
};
