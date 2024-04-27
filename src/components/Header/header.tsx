import React from 'react';
import styles from './header.module.scss';
import catalogLogo from './header.logo/header-logo.png';
import menuLogo from './header.logo/burger-menu.png';
import FavoritesHeard from './header.logo/Favourites (Heart Like).png';
import shops from './header.logo/Shopping bag (Cart).png';
import { Navigation } from '../Navigation/Navigation';

export const Header: React.FC = () => {
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
            <div className={styles.headerButtons}>
              <img
                className={styles.headerButtonIcon}
                src={FavoritesHeard}
                alt="Favorites"
              />
            </div>
            <div className={styles.headerButtons}>
              <img
                className={styles.headerButtonIcon}
                src={shops}
                alt="Shopping"
              />
            </div>
          </div>

          <img className={styles.menuLogo} src={menuLogo} alt="Menu Logo" />
        </header>
      </section>
    </>
  );
};
