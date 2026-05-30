import React from 'react';
import styles from './AccessoriesPage.module.scss';
import { AccessoriesHeroSection } from '../AccessoriesHeroSection';

export const AccessoriesPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <AccessoriesHeroSection />
      </div>
    </section>
  );
};
