import React from 'react';
import styles from './TabletsPage.module.scss';
import { TabletsHeroSection } from '../TabletsHeroSection';

export const TabletsPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <TabletsHeroSection />
      </div>
    </section>
  );
};
