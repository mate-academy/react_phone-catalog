import React, { useEffect, useState } from 'react';
import styles from './HeaderDesktop.module.scss';
import { Link, NavLink } from 'react-router-dom';
import logoImg from '../../../../public/icons/Logo.svg';
import { useCart } from '../../../context/CartContext';

export function HeaderDesktop() {
  const { cartItems, favourites } = useCart();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logoImg} alt="logo" />
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/phones">Phones</Link>
        <Link to="/tablets">Tablets</Link>
        <Link to="/accessories">Accessories</Link>
      </nav>

      <div className={styles.icons}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.favorites} ${styles.favorites__active}` : styles.favorites
          }
        >
          {favourites.length > 0 && (
            <div className={styles.badge}>{favourites.length}</div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.cart} ${styles.cart__active}` : styles.cart
          }
        >
          {cartItems.length > 0 && (
            <div className={styles.badge}>{cartItems.length}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
}
