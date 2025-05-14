import React from 'react';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetailsHeroSection } from '../ProductDetailsHeroSection';
import { BackButton } from '@/components/UI/BackButton';

export const ProductDetailsPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <BackButton/>
        <ProductDetailsHeroSection />
      </div>
    </section>
  );
};
