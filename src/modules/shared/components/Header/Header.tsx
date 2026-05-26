import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { MobileMenu } from '../Menu/Menu';
import { FavoritesContext } from '../../../../context/FavoritesContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favoritesItems } = useContext(FavoritesContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.navLogo}>
        <img src="/img/icons/Logo.svg" alt="Logo" />
      </Link>

      <nav className={styles.nav}>
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
        </NavLink>
      </nav>

      <div className={styles.icons}>
        <Link to="/favorites" className={styles.icon}>
          <img src="/img/icons/Favorites.svg" alt="Favorites" />
          {favoritesItems.length > 0 && (
            <span className={styles.count}>{favoritesItems.length}</span>
          )}
        </Link>
        <Link to="/cart" className={styles.icon}>
          <img src="/img/icons/Shopping_bag.svg" alt="Shopping bag " />
        </Link>
      </div>

      <button
        className={styles.burger}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <img src="/img/icons/Menu.svg" alt="Menu" />
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
