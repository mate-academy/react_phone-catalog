import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to="/" className={styles.header__logo_link}>
          <img
            src="../../../img/Logo.png"
            alt="Nice Gadgets Logo"
            className={styles.header__logo_img}
          />
        </NavLink>
      </div>

      {/* Desktop navigation */}
      <nav className={styles.header__nav_desktop}>
        <ul className={styles.header__nav_list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Phones"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              PHONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Tablets"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              TABLETS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Accessories"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Desktop cart */}
      <div className={styles.header__actions_desktop}>
        <NavLink to="/favorites">
          <img src="../../../img/Favorites Hurt.png" alt="Favorites" />
        </NavLink>
        <NavLink to="/cart">
          <img src="../../../img/Shopping bag (Cart).png" alt="Cart" />
        </NavLink>
      </div>

      {/* Burger button */}
      <button
        className={`${styles.header__burger} ${isOpen ? styles.header__burger_open : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Fullscreen mobile menu */}
      <div
        className={`${styles.header__menuOverlay} ${
          isOpen ? styles.header__menuOverlay_open : ''
        }`}
      >
        <nav className={styles.header__nav_mobile}>
          <ul className={styles.header__nav_list_mobile}>
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Phones"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Tablets"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Accessories"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile cart at bottom */}
        <div className={styles.header__actions_mobile}>
          <NavLink
            to="/favorites"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.activeActions : '')}
          >
            <img src="../../../img/Favorites Hurt.png" alt="Favorites" />
          </NavLink>
          <NavLink
            to="/cart"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.activeActions : '')}
          >
            <img src="../../../img/Shopping bag (Cart).png" alt="Cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
