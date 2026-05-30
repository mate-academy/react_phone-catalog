import React from 'react';

import { Dots } from './components/Dots';
import { Slider } from './components/Slider';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles['hero-section']}>
      <div className="flex-center">
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      </div>
      <div className={styles['slider-container']}>
        <Slider />
        <Dots />
      </div>
    </section>
  );
};
