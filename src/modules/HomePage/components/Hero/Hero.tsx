import React from 'react';
import { Slider } from '../Slider';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {
  return (
    <div className={`page__hero ${styles.hero}`}>
      <div className={styles.hero__wrapper}>
        <h1 className={`${styles.hero__title} main-title`}>
          Welcome to Nice Gadgets store!
        </h1>

        <Slider />
      </div>
    </div>
  );
};
