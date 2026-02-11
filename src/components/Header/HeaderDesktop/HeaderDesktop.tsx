import React, { useEffect, useState } from 'react';
import styles from './HeaderDesktop.module.scss';
import { Link, NavLink } from 'react-router-dom';
import logoImg from '../../../../public/icons/Logo.svg';
import { useCart } from '../../../context/CartContext';

export function HeaderDesktop() {
  const { cartItems, favourites } = useCart();
  const totalCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
  const totalFav = favourites.length;

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logoImg} alt="logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.icons}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles.favorites} ${styles.favorites__active}`
              : styles.favorites
          }
        >
          {totalFav > 0 && <div className={styles.badge}>{totalFav}</div>}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.cart} ${styles.cart__active}` : styles.cart
          }
        >
          {totalCount > 0 && <div className={styles.badge}>{totalCount}</div>}
        </NavLink>
      </div>
    </header>
  );
}
