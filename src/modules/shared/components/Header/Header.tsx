/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import '@/styles/main.scss';

import { Menu } from '../Menu';
import { NavLink, useLocation } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { cart, favorites } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  // disabling content scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <NavLink to="/" className={styles.header__logo}>
            <img
              src="img/icons/Logo@2x.png"
              alt="Nice gadgets"
              className={styles['header__logo--img']}
            />
          </NavLink>

          <nav className={styles.header__nav}>
            <ul className={styles['header__nav--list']}>
              <li>
                <NavLink
                  className={classNames(
                    'text__uppercase',
                    styles['header__nav--link'],
                    {
                      [styles['header__nav--link__active']]:
                        location.pathname === '/',
                    },
                  )}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={classNames(
                    'text__uppercase',
                    styles['header__nav--link'],
                    {
                      [styles['header__nav--link__active']]:
                        location.pathname.startsWith('/phones'),
                    },
                  )}
                  to="/phones"
                >
                  Phones
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={classNames(
                    'text__uppercase',
                    styles['header__nav--link'],
                    {
                      [styles['header__nav--link__active']]:
                        location.pathname.startsWith('/tablets'),
                    },
                  )}
                  to="/tablets"
                >
                  Tablets
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={classNames(
                    'text__uppercase',
                    styles['header__nav--link'],
                    {
                      [styles['header__nav--link__active']]:
                        location.pathname.startsWith('/accessories'),
                    },
                  )}
                  to="/accessories"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.header__icons}>
          <div className={styles['header__icons--mobile']}>
            <div
              className={styles['header__icons--menu']}
              onClick={() => handleMenuToggle()}
            >
              {mobileMenuOpen ? (
                <i className="icon icon--close"></i>
              ) : (
                <i className="icon icon--menu"></i>
              )}
            </div>
          </div>
          <div
            className={classNames(styles['header__icons--desktop'], {
              [styles.header__icons__active]:
                location.pathname.startsWith('/favorites'),
            })}
          >
            <div className={styles['header__icons--wrapper']}>
              <NavLink
                to="/favorites"
                className="icon icon--heart-empty"
              ></NavLink>
              {favorites.length > 0 && (
                <div className={styles['header__icons--badge']}>
                  {favorites.length}
                </div>
              )}
            </div>
          </div>
          <div
            className={classNames(styles['header__icons--desktop'], {
              [styles.header__icons__active]:
                location.pathname.startsWith('/cart'),
            })}
          >
            <div className={styles['header__icons--wrapper']}>
              <NavLink to="/cart" className="icon icon--cart"></NavLink>
              {cart.length > 0 && (
                <div className={styles['header__icons--badge']}>
                  {cart.length > 99 ? '99+' : cart.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Menu isOpen={mobileMenuOpen} onClose={handleMenuClose} />
    </div>
  );
};
