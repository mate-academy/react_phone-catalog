import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from '../Menu';
import { useFavorite } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [menuOpened, setMenuOpened] = useState(false);
  const { favorites } = useFavorite();
  const { cart, totalCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={'/'} className={styles.header__content__logo}>
          <img src="img/logo/Logo.svg" alt="" />
        </Link>

        <div className={styles.header__content__links}>
          <nav className={styles.header__content__nav}>
            <NavLink
              to="/"
              className={classNames(styles.link, {
                [styles.isActive]: pathname === '/',
              })}
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={classNames(styles.link, {
                [styles.isActive]: pathname.startsWith('/phones'),
              })}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={classNames(styles.link, {
                [styles.isActive]: pathname.startsWith('/tablets'),
              })}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={classNames(styles.link, {
                [styles.isActive]: pathname.startsWith('/accessories'),
              })}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.header__actions}>
            <div
              className={classNames(styles.header__actions__wrapper, {
                [styles.isActive]: pathname === '/favorites',
              })}
            >
              <Link
                to="/favorites"
                className={classNames(styles.header__actions__btn, {
                  [styles.isActive]: pathname === '/favorites',
                })}
              >
                <img src="img/icons/heart.svg" alt="favorites" />
                {favorites.length > 0 && (
                  <span className={styles.header__actions__badge}>
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
            <div
              className={classNames(styles.header__actions__wrapper, {
                [styles.isActive]: pathname === '/cart',
              })}
            >
              <Link
                to="/cart"
                className={classNames(styles.header__actions__btn, {
                  [styles.isActive]: pathname === '/cart',
                })}
              >
                <img src="img/icons/bag.svg" alt="Cart" />
                {cart.length > 0 && (
                  <span className={styles.header__actions__badge}>
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div
            className={styles.header__menuIcone}
            onClick={() => {
              setMenuOpened(true);
            }}
          >
            <img src="./img/icons/Menu.svg" alt="Menu" />
          </div>
        </div>
      </div>
      {menuOpened && <Menu onClose={() => setMenuOpened(false)} />}
    </header>
  );
};
