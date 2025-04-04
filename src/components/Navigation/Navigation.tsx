import React from 'react';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

export const Navigation = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });

  return (
    <nav
      className={classNames(styles.nav, {
        [styles['nav--mobile']]: !isTablet,
      })}
    >
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--mobile']]: !isTablet,
        })}
      >
        <li className={styles.nav__item}>
          <a href="#about" className={styles.nav__link}>
            home
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#process" className={styles.nav__link}>
            Phones
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#testimonials" className={styles.nav__link}>
            tablets
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#contacts" className={styles.nav__link}>
            accessories
          </a>
        </li>
      </ul>
    </nav>
  );
};
