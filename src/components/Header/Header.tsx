import { NavLink, Link } from "react-router-dom";
import styles from './Header.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg'
import React from 'react';

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
      </nav>
    </div>
  </header>
  );



