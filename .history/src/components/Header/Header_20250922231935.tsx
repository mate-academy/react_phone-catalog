import React from 'react';
import styles from './Header.module.scss';
import { NavBar } from './NavBar/NavBar';
import { Favorites } from './Favorites/Favorites';
import { Cart } from './Cart/Cart';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>Logo</div>
      <NavBar />
      <div>
        <Favorites /> | <Cart />
      </div>
    </header>
  );
};
