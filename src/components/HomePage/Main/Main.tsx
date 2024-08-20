import React from 'react';
import styles from './Main.module.scss';
import { Slider } from './Swiper';

export const Main: React.FC = () => {
  return (
    <section className={`${styles.page__main} ${styles.main}`}>
      <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>
      <Slider />
    </section>
  );
};
