import React from 'react';
import styles from './Header.module.scss';

import logo from '../../img/main-logo.svg';
import favoriteIcon from '../../img/icons/heart-icon/heart-icon.svg';
import shopingCartIcon from '../../img/icons/shoping-cart-icon.svg';
import burgerMenuIcon from '../../img/icons/burger-menu-icon.svg';

import { Nav } from './components/Nav';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles['header__content--left']}>
          <img src={logo} alt="Logo" />
          <div className={styles['header--hide-on-mobile']}>
            <Nav />
          </div>
        </div>
        <div className="header__content--right">
          <div className="header__buttons-wrapper">
            <div className={styles['header--hide-on-mobile']}>
              <NavLink
                to="favorites"
                className={({ isActive }) =>
                  classNames(styles.header__btn, {
                    [styles['header__btn--active']]: isActive,
                  })
                }
              >
                <img src={favoriteIcon} alt="Go to Favorites" />
              </NavLink>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  classNames(styles.header__btn, {
                    [styles['header__btn--active']]: isActive,
                  })
                }
              >
                <img src={shopingCartIcon} alt="Go to Shoping Cart" />
              </NavLink>
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
