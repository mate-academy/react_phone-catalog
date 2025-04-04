import styles from './Header.module.scss';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import classNames from 'classnames';

import logo from '../../imgs/svg/Logo.svg';
import menuIcon from '../../imgs/svg/menu-icon.svg';
import { BurgerMenu } from '../BurgerMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, favorites } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.header__logo}>
        <img className={styles.header__logo_img} src={logo} alt="logo" />
      </NavLink>
      <div className={styles.header__group}>
        <div className={styles.header__links}>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__link, {
                [styles.active]: isActive && location.pathname === '/',
              })
            }
            to="/"
          >
            home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__link, {
                [styles.active]: isActive && location.pathname === '/phones',
              })
            }
            to="/phones"
          >
            phones
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__link, {
                [styles.active]: isActive && location.pathname === '/tablets',
              })
            }
            to="/tablets"
          >
            tablets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__link, {
                [styles.active]:
                  isActive && location.pathname === '/accessories',
              })
            }
            to="/accessories"
          >
            accessories
          </NavLink>
        </div>
        <div className={styles.header__add}>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__add_favorites, {
                [styles.active]: isActive && location.pathname === '/favorites',
              })
            }
            to="/favorites"
          >
            {favorites.length > 0 && (
              <span className={styles.header__add_badge}>
                {favorites.length}
              </span>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(styles.header__add_cart, {
                [styles.active]: isActive && location.pathname === '/cart',
              })
            }
            to="/cart"
          >
            {cart.length > 0 && (
              <span className={styles.header__add_badge}>{cart.length}</span>
            )}
          </NavLink>
        </div>
      </div>
      <button className={styles.header__menu} onClick={toggleMenu}>
        <img
          className={styles.header__menu_img}
          src={menuIcon}
          alt="menu-icon"
        />
      </button>
      <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};
