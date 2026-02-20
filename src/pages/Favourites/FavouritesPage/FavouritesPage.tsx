import React from 'react';
import styles from './FavouritesPage.module.scss';
import { FavouritesHeroSection } from '../FavouritesHeroSection';

export const FavouritesPage: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heroContainer}>
        <FavouritesHeroSection />
      </div>
    </section>
  );
};
