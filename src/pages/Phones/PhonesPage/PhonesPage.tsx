import React from 'react';
import styles from './PhonesPage.module.scss';
import { PhonesHeroSection } from '../PhonesHeroSection';

export const PhonesPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <PhonesHeroSection />
      </div>
    </section>
  );
};
