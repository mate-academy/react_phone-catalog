import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link and NavLink for navigation
import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section: Logo */}
        <Link to="/" className={styles.logo}>
          <img src="/img/icons/dark_logo.svg" alt="Logo" />
        </Link>

        {/* Middle Section: Navigation Links */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Accessories
          </NavLink>
        </nav>

        {/* Hamburger Menu for Small Screens */}
        <div className={styles.hamburgerMenu}>
          <HamburgerMenu />
        </div>
        {/* Right Section: Favorites and Cart Icons */}
        <div className={styles.icons}>
          <Link to="/favorites" className={styles.iconLink}>
            <img
              src="/img/icons/dark_like.svg"
              alt="Favorites"
              className={styles.icon}
            />
          </Link>
          <Link to="/cart" className={styles.iconLink}>
            <img
              src="/img/icons/dark_cart.svg"
              alt="Cart"
              className={styles.icon}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
