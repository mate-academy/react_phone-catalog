import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import { FavouriteIcon, Logo, CartIcon } from '../../helpers/icons';

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.left_side}>
        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>

        <Nav />
      </div>
      <div className={styles.right_side}>
        <NavLink to="/favourites" className={styles.favourite}>
          <FavouriteIcon />
        </NavLink>

        <NavLink to="/cart" className={styles.cart}>
          <CartIcon />
        </NavLink>
      </div>
    </header>
  );
};
