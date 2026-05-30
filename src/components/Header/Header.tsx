import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../img/logo.png';
import favoriteIcon from '../../img/icons/heart-icon/heart-icon.svg';
import shopingCartIcon from '../../img/icons/shoping-cart-icon.svg';
import burgerMenuIcon from '../../img/icons/burger-menu-icon.svg';
import closeMenuIcon from '../../img/icons/close-icon.svg';

import styles from './Header.module.scss';

import { Nav } from './components/Nav';

import classNames from 'classnames';

export const Header = () => {
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const location = useLocation();

  const handleNavigationMenuOpen = () => {
    setIsNavigationMenuOpen(state => !state);
  };

  useEffect(() => {
    setIsNavigationMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (isNavigationMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavigationMenuOpen]);

  return (
    <header
      className={classNames(styles.header, {
        [styles['header-backrground-blur']]: !isNavigationMenuOpen,
      })}
    >
      <div className={styles.header__content}>
        <div className={styles['header__content--left']}>
          <Link to={'/'}>
            <img className="main-logo" src={logo} alt="Logo" />
          </Link>
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
              <button
                onClick={handleNavigationMenuOpen}
                className={styles.header__btn}
              >
                <img
                  src={burgerMenuIcon}
                  className={classNames({
                    'show-icon': !isNavigationMenuOpen,
                    'hide-icon': isNavigationMenuOpen,
                  })}
                  alt="Open Burger menu icon"
                />
                <img
                  src={closeMenuIcon}
                  className={classNames(
                    styles['header__btn--close-menu-icon'],
                    {
                      'show-icon': isNavigationMenuOpen,
                      'hide-icon': !isNavigationMenuOpen,
                    },
                  )}
                  alt="Open Burger menu icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside
        className={classNames(styles['header__nav-menu'], {
          [styles['header__nav-menu--active']]: isNavigationMenuOpen,
        })}
      >
        <div className={styles['header-nav-menu__links-wrapper']}>
          <Nav variant="mobile" />
        </div>
        <div className={styles['header-nav-menu__links-wrapper--bottom']}>
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              classNames(
                `${styles.header__btn} ${styles['header__btn--nav-menu']}`,
                {
                  [styles['header__btn--active']]: isActive,
                },
              )
            }
          >
            <img src={favoriteIcon} alt="Go to Favorites" />
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              classNames(
                `${styles.header__btn} ${styles['header__btn--nav-menu']}`,
                {
                  [styles['header__btn--active']]: isActive,
                },
              )
            }
          >
            <img src={shopingCartIcon} alt="Go to Shoping Cart" />
          </NavLink>
        </div>
      </aside>
    </header>
  );
};
