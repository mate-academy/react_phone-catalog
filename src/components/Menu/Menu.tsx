import React from 'react';
import styles from './Menu.module.scss';
import { Navbar } from '../Navbar';
import { ShoppingCart } from '../ShoppingCart';
import { Favourites } from '../Favourites';

export const Menu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <div className={styles.menu__top}>
        <Navbar className={styles.menu__navbar} />
      </div>
      <div className={styles.menu__bottom}>
        <Favourites className={styles.menu__favourites} />
        <ShoppingCart className={styles.menu__cart} />
      </div>
    </nav>
  );
};
