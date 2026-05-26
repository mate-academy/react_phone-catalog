import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { FavoritesContext } from '../../../../context/FavoritesContext';

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { favoritesItems } = useContext(FavoritesContext);

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
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Accessories
        </NavLink>{' '}
      </nav>

      <footer className={styles.footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.footerItem} ${isActive ? styles.footerItem_active : ''}`
          }
          onClick={onClose}
        >
          <img src="/img/icons/Favorites.svg" alt="Favorites" />
          {favoritesItems.length > 0 && (
            <span className={styles.count}>{favoritesItems.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.footerItem} ${isActive ? styles.footerItem_active : ''}`
          }
          onClick={onClose}
        >
          <img
            className={styles.icon}
            src="/img/icons/Shopping_bag.svg"
            alt="Shopping bag "
          />
        </NavLink>
      </footer>
    </div>
  );
};
