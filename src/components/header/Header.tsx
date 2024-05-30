import React from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header} id='header'>
      <div className={styles[`header__container--1`]}>
        <img src=".\img\svg\header_Logo.svg" className="logo" />

        <nav className={styles['header__nav']}>
          <ul className={styles[`header__nav__list`]}>
            <li className={styles[`header__nav__list__element`]}>Home</li>
            <li className={styles[`header__nav__list__element`]}>Phones</li>
            <li className={styles[`header__nav__list__element`]}>Tablets</li>
            <li className={styles[`header__nav__list__element`]}>
              Accessories
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles[`header__container--2`]}>
      <a href="#burger" className={styles[`header__burger`]}>
          <img
            src=".\img\svg\burger_menu.svg"
            alt="burger menu"
            className={styles['header__burger__img']}
          />
        </a>

        <a href="#fav" className={styles[`header__fav`]}>
          <img
            src=".\img\svg\fav_icon.svg"
            alt="Fav_logo"
            className="logo__image"
          />
        </a>

        <a href="#cart" className={styles[`header__cart`]}>
          <img
            src="./img/svg/Shopping_bag_Cart.svg"
            alt="Cart_logo"
            className="logo__image"
          />
        </a>
      </div>
    </header>
  );
};
