import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logos/Logo.svg';
import menu from '../../assets/Icons/Menu.svg';
import favouritesIcon from '../../assets/Icons/Favourites.svg';
import cart from '../../assets/Icons/Cart.svg';
import close from '../../assets/Icons/Close.svg';

import styles from './Header.module.scss';
import classNames from 'classnames';
import { UseHooks } from '../../AppHooks';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { setOpenMenu, openMenu, cartItems, favourites, setCurrentDevice } =
    UseHooks();

  const togleMenu = () => setOpenMenu(!openMenu);
  const clearCurDevice = () => setCurrentDevice(null);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__linkHome} onClick={clearCurDevice}>
        <img src={logo} className={styles.header__home} alt="logo" />
      </Link>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <li
            className={classNames(styles.header__li, {
              [styles['header__li--active']]:
                pathname.startsWith('accessories'),
            })}
          >
            <Link
              className={classNames(styles.header__listLink, {
                [styles['header__listLink--active']]: pathname === '/',
              })}
              to="/"
              onClick={clearCurDevice}
            >
              Home
            </Link>
          </li>
          <li
            className={classNames(styles.header__li, {
              [styles['header__li--active']]: pathname.startsWith('/phones'),
            })}
          >
            <Link
              className={classNames(styles.header__listLink, {
                [styles['header__listLink--active']]:
                  pathname.startsWith('/phones'),
              })}
              to="/phones?sort=age"
              onClick={clearCurDevice}
            >
              Phones
            </Link>
          </li>
          <li
            className={classNames(styles.header__li, {
              [styles['header__li--active']]: pathname.startsWith('/tablets'),
            })}
          >
            <Link
              className={classNames(styles.header__listLink, {
                [styles['header__listLink--active']]:
                  pathname.startsWith('/tablets'),
              })}
              to="/tablets?sort=age"
              onClick={clearCurDevice}
            >
              Tablets
            </Link>
          </li>
          <li
            className={classNames(styles.header__li, {
              [styles['header__li--active']]:
                pathname.startsWith('/accessories'),
            })}
          >
            <Link
              className={classNames(styles.header__listLink, {
                [styles['header__listLink--active']]:
                  pathname.startsWith('/accessories'),
              })}
              to="/accessories?sort=age"
              onClick={clearCurDevice}
            >
              Accessories
            </Link>
          </li>
        </ul>
        <div className={styles.header__icons}>
          <Link
            className={classNames(styles.header__iconsLink2, {
              [styles['header__iconsLink2--active']]:
                pathname.startsWith('/favourites'),
            })}
            to="/favourites"
            onClick={clearCurDevice}
          >
            <img src={favouritesIcon} alt="favourites" />
            {favourites.length > 0 && (
              <div className={styles.header__iconQuantity}>
                {favourites.length}
              </div>
            )}
          </Link>
          <Link
            className={classNames(styles.header__iconsLink2, {
              [styles['header__iconsLink2--active']]:
                pathname.startsWith('/cart'),
            })}
            to="/cart"
            onClick={clearCurDevice}
          >
            <img src={cart} alt="cart" />
            {cartItems.length > 0 && (
              <div className={styles.header__iconQuantity}>
                {cartItems.length}
              </div>
            )}
          </Link>
        </div>
      </nav>
      <button className={styles.header__iconsLink} onClick={() => togleMenu()}>
        <img src={openMenu ? close : menu} alt="menu" />
      </button>
    </header>
  );
};
