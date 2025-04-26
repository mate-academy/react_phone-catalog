import React from 'react';
import styles from './Hero.module.scss';
import { Slider } from '../Slider';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.hero__title}>Welcome to Nice Gadgets store!</h1>

        <Slider />
      </div>
    </section>
  );
};
