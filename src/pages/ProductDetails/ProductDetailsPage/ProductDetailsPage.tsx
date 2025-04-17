import React from 'react';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetailsHeroSection } from '../ProductDetailsHeroSection';

export const ProductDetailsPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <ProductDetailsHeroSection />
      </div>
    </section>
  );
};
