import React from 'react';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>Home</li>
        <li className={styles.nav__item}>Phones</li>
        <li className={styles.nav__item}>Tablets</li>
        <li className={styles.nav__item}>Accessories</li>
      </ul>
    </nav>
  );
};
