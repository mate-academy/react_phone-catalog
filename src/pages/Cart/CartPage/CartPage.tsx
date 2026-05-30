import React from 'react';
import styles from './CartPage.module.scss';
import { CartHeroSection } from '../CartHeroSection';

export const CartPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <CartHeroSection />
      </div>
    </section>
  );
};
