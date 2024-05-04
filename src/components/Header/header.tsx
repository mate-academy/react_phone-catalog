import React from 'react';
import styles from './header.module.scss';
import catalogLogo from './header.logo/header-logo.png';
import menuLogo from './header.logo/burger-menu.png';
import FavoritesHeard from './header.logo/Favourites (Heart Like).png';
import shops from './header.logo/Shopping bag (Cart).png';
import { Navigation } from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../../local/localStorege';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [styles.navigation__links, isActive ? styles.isActive : ''].join(' ');
};

export const Header: React.FC = () => {
  const [items] = useLocalStorage('favorites', []);
  const [cart] = useLocalStorage('cart', []);

  return (
    <>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <img
            className={styles.headerLogo}
            src={catalogLogo}
            alt="Catalog Logo"
          />
          <Navigation />
          <div className={styles.buttonsContainer}>
            <NavLink to={'/favorites'} className={getLinkClass}>
              <div className={styles.headerButtons}>
                {items.length > 0 && (
                  <div className={styles.favoriteCounts}>{items.length}</div>
                )}
                <img
                  className={styles.headerButtonIcon}
                  src={FavoritesHeard}
                  alt="Favorites"
                />
              </div>
            </NavLink>
            <NavLink to={'/cart'} className={getLinkClass}>
              <div className={styles.headerButtons}>
                {cart.length > 0 && (
                  <div className={styles.favoriteCounts}>{cart.length}</div>
                )}
                <img
                  className={styles.headerButtonIcon}
                  src={shops}
                  alt="Shopping"
                />
              </div>
            </NavLink>
          </div>

          <img className={styles.menuLogo} src={menuLogo} alt="Menu Logo" />
        </header>
      </section>
    </>
  );
};
