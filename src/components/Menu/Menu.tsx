import React from 'react';
import styles from './Menu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Menu = ({ isOpen, onClose }) => {
  return (
    <aside
      id={'menu'}
      className={classNames(styles.menu, {
        [styles.menuVisible]: isOpen,
      })}
    >
      <div className={styles['menu__top-bar']}>
        <header className={styles.header}>
          <a href="/" className={styles.menu__logo}>
            <img
              src="/public/Images/Logo.svg"
              alt="Nice Gadgets Logo"
              className={styles['menu__logo-image']}
            />
          </a>
          <a
            href="#"
            className={styles['menu__close-button']}
            aria-label="Close Menu"
            onClick={onClose}
          >
            <img
              src="public/Images/Close.svg"
              alt="Close"
              className={styles.coverImage}
            />
          </a>
        </header>
      </div>

      <nav className={styles.menu__nav}>
        <ul className={styles['menu__nav-list']}>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/"
              className={styles['menu__nav-link']}
              onClick={onClose}
            >
              Home
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="catalog/phones"
              className={styles['menu__nav-link']}
              onClick={onClose}
            >
              Phones
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="catalog/tablets"
              className={styles['menu__nav-link']}
              onClick={onClose}
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="catalog/accessories"
              className={styles['menu__nav-link']}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles['menu__bottom-icons']}>
        <NavLink
          to="/favorites"
          className={styles.menu__icon}
          onClick={onClose}
        >
          <img src="public/Images/Favs.svg" alt="Favorites" />
        </NavLink>
        <NavLink to="/cart" className={styles.menu__icon} onClick={onClose}>
          <img src="public/Images/Shopping-bag.svg" alt="Cart" />
        </NavLink>
      </div>
    </aside>
  );
};
