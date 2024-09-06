import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import favoritesIconSrc from '../../img/icons/FavoritesIcon.svg';
import { useAppContext } from '../../context/AppContext';
import favoritesIconSrcDT from '../../img/icons/FavoritesIcon--DarkTheme.svg';
import cartIconSrc from '../../img/icons/CartIcon.svg';
import cartIconSrcDT from '../../img/icons/CartIcon--DarkTheme.svg';
import { Theme } from '../Theme';

export const MobileMenu: React.FC = () => {
  const { setIsMobMenuOpen, theme } = useAppContext();
  const handleMenuStatus = () => {
    setIsMobMenuOpen(false);
  };

  return (
    <div className={styles.topWrapper}>
      <div className={styles.menuOverlay}>
        <div className={styles.linkWrapper}>
          <nav className={styles.nav} role="navigation">
            <NavLink
              to="/"
              exact
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={styles.action}
            onClick={handleMenuStatus}
            activeClassName={styles.isActive}
          >
            <div className={styles.actionIcon}>
              <img
                src={`${theme === 'dark' ? favoritesIconSrcDT : favoritesIconSrc}`}
                alt="Favorites"
              />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={styles.action}
            onClick={handleMenuStatus}
            activeClassName={styles.isActive}
          >
            <div className={styles.actionIcon}>
              <img
                src={`${theme === 'dark' ? cartIconSrcDT : cartIconSrc}`}
                alt="Cart"
                className={styles.icon}
              />
            </div>
          </NavLink>

          <div className={styles.action}>
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
};
