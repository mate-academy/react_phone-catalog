import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ''}`}>
      <header className={styles.header}>
        <Link to="/" className={styles.navLogo} onClick={onClose}>
          <img src="/img/icons/Logo.svg" alt="Logo" />
        </Link>
        <button className={styles.burger} onClick={onClose}>
          <img
            className={styles.icon}
            src="/img/icons/Close.svg"
            alt="Close_Menu"
          />
        </button>
      </header>

      <nav className={styles.nav_links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ''}`
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ''}`
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ''}`
          }
        >
          Accessories
        </NavLink>{' '}
      </nav>

      <footer className={styles.footer}>
        <Link to="/favorites" className={styles.footerItem}>
          <img
            className={styles.icon}
            src="/img/icons/Favorites.svg"
            alt="Favorites"
          />
        </Link>
        <Link to="/cart" className={styles.footerItem}>
          <img
            className={styles.icon}
            src="/img/icons/Shopping_bag.svg"
            alt="Shopping bag "
          />
        </Link>
      </footer>
    </div>
  );
};
