import React from 'react';
import styles from './NavIcon.module.scss';
import { IconFavorite } from '../Icon/IconFavorite';
import { IconCart } from '../IconCart/IconCart';

export const NavIcon = () => {
  return (
    <>
      <a className={styles.navIcon}>
        <IconFavorite />
      </a>
      <a className={styles.navIcon}>
        <IconCart />
      </a>
    </>
  );
};
