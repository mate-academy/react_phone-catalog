import React from 'react';
import styles from './ProductDetailsPage.module.scss';

import { BackButton } from '@/components/UI/BackButton';
import { ProductDetailsHeroSection } from '../ProductDetailsHeroSection';
import { ProductDetailsFirstSection } from '../ProductDetailsFirstSection';

export const ProductDetailsPage: React.FC = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.heroContainer}>
          <BackButton />
          <ProductDetailsHeroSection />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.firstContainer}>
          <ProductDetailsFirstSection />
        </div>
      </section>
    </>
  );
};
