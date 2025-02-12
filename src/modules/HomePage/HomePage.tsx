import React from 'react';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>

      <button className={styles.buttonLeft}>{'<'}</button>
      <button className={styles.buttonRight}>{'>'}</button>

      <div className={styles.wrapper}>
        <div className={styles.imgBox}></div>
      </div>

      <div className={styles.dots}>
        <div className={styles.dots__dot}></div>
        <div className={styles.dots__dot}></div>
        <div className={styles.dots__dot}></div>
      </div>
    </div>
  );
};
