import React from 'react';
import styles from './Header.module.scss';

import logo from '../../img/main-logo.svg';
import favoriteIcon from '../../img/icons/heart-icon/heart-icon.svg';
import shopingCartIcon from '../../img/icons/shoping-cart-icon.svg';
import burgerMenuIcon from '../../img/icons/burger-menu-icon.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles['header__content--left']}>
          <img src={logo} alt="Logo" />
          <div className={styles['header--hide-on-mobile']}>
            <nav className="nav">
              <ul className={styles['header__nav-list']}>
                <li className="nav__list-item">Home</li>
                <li className="nav__list-item">Phones</li>
                <li className="nav__list-item">Tablets</li>
                <li className="nav__list-item">Accessories</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="header__content--right">
          <div className="header__buttons-wrapper">
            <div className={styles['header--hide-on-mobile']}>
              <button className={styles.header__btn}>
                <img src={favoriteIcon} alt="Go to Favorites" />
              </button>
              <button className={styles.header__btn}>
                <img src={shopingCartIcon} alt="Go to Shoping Cart" />
              </button>
            </div>
            <div className={styles['header--show-on-mobile']}>
              <button className={styles.header__btn}>
                <img src={burgerMenuIcon} alt="Open Burger menu icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
