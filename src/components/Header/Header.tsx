import { NavLink, Link } from "react-router-dom";
import styles from './Header.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg'
import cartIcon from '../../img/icons/CartIcon.svg'
import favIcon from '../../img/icons/fav.svg'
import React from 'react';
import { Search } from  '../Search';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link
      to="/"
      className={styles.logoLink}
    >
      <img
        src={LogoIcon}
        alt="Nice Gadgets Logo"
        className={styles.logo}
      />
    </Link>

    <div className={styles.container}>
      <nav className={styles.nav}>

        <NavLink
          to="/"
          className={styles.navItem}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={styles.navItem}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={styles.navItem}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={styles.navItem}
        >
          Accessories
        </NavLink>

        <div className={styles.actionsContainer}>
          <Search />

          <div className={styles.actions}>
            <NavLink
              to="/theme"
              className={styles.actionItem}
            >
              <div className={styles.navItem}>
                THEME
              </div>
            </NavLink>

            <NavLink
              to="/favorites"
              className={styles.actionItem}
            >
              <div className={styles.actionIcon}>
                <img
                  src={favIcon}
                  alt="Add to favorites"
                  className={styles.icon}
                />
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.actionItem}
            >
              <div className={styles.actionIcon}>
                <img
                  src={cartIcon}
                  alt="Add to cart"
                  className={styles.icon}
                />
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
  );



