import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { BurgerMenu } from '../BurgerMenu';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/Favorites/FavoritesContext';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favouritesCount = favorites.length;

  const handleOpenMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/">
          <img
            className={styles.header__logo}
            src="img/logo-img.svg"
            alt="logo image"
          />
        </NavLink>

        <div className={styles.header__container}>
          <nav className={styles.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.header__link} ${styles['header__link--home']} ${isActive ? styles['header__link--active'] : ''}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`
              }
            >
              PHONES
            </NavLink>
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`
              }
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`
              }
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className={styles.header__button}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `${styles['header__button-link']} ${isActive ? styles['header__button-link--active'] : ''}`
              }
            >
              <div className={styles['header__icon-wrapper']}>
                <img src="img/icons/icon-favourites.svg" alt="favourites" />
                {favouritesCount > 0 && (
                  <span className={styles.header__badge}>
                    {favouritesCount}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles['header__button-link']} ${isActive ? styles['header__button-link--active'] : ''}`
              }
            >
              <div className={styles['header__icon-wrapper']}>
                <img src="img/icons/icon-cart.svg" alt="cart" />
                {cartCount > 0 && (
                  <span className={styles.header__badge}>{cartCount}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
        <button
          className={styles['burger-button']}
          aria-label="Toggle menu"
          onClick={handleOpenMenu}
        >
          {open ? (
            <img src="img/icons/close-menu.svg" alt="close burger menu" />
          ) : (
            <img src="img/icons/menu.svg" alt="burger menu" />
          )}
        </button>
      </header>
      {open && <BurgerMenu open={open} setOpen={setOpen} />}
    </>
  );
};
