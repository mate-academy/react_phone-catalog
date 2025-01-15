import { Logo } from '../Logo';
import { NavIcon } from '../NavIcon/NavIcon';
import { Navigation } from '../Navigation';
import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.scss';
import React from 'react';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div className={styles.header__nav}>
        <Navigation />
      </div>

      <div className={styles.header__icons}>
        <div className={styles.icon}>
          <ThemeToggle />
        </div>

        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavIcon path="/favourites" type="favourite" />
        </div>

        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavIcon path="/cart" type="cart" />
        </div>
      </div>
    </header>
  );
};
