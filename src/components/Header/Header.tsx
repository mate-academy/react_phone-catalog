import React, { useState } from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavouritesContext';
import { BurgerMenu } from '../BurgerMenu';

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
      <header className={style.header}>
        <NavLink to="/">
          <img
            className={style.header__logo}
            src="img/icons/Logo.svg"
            alt="logo image"
          />
        </NavLink>

        <div className={style.header__container}>
          <nav className={style.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${style.header__link} ${style['header__link--home']} ${isActive ? style['header__link--active'] : ''}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${style.header__link} ${isActive ? style['header__link--active'] : ''}`
              }
            >
              PHONES
            </NavLink>
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                `${style.header__link} ${isActive ? style['header__link--active'] : ''}`
              }
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${style.header__link} ${isActive ? style['header__link--active'] : ''}`
              }
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className={style.header__button}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `${style['header__button-link']} ${isActive ? style['header__button-link--active'] : ''}`
              }
            >
              <div className={style['header__icon-wrapper']}>
                <img
                  src="img/icons/Favourites (Heart Like).svg"
                  alt="favourites"
                />
                {favouritesCount > 0 && (
                  <span className={style.header__badge}>{favouritesCount}</span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${style['header__button-link']} ${isActive ? style['header__button-link--active'] : ''}`
              }
            >
              <div className={style['header__icon-wrapper']}>
                <img src="img/icons/Shopping bag (Cart).svg" alt="cart" />
                {cartCount > 0 && (
                  <span className={style.header__badge}>{cartCount}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
        <button
          className={style['burger-button']}
          aria-label="Toggle menu"
          onClick={handleOpenMenu}
        >
          {open ? (
            <img src="img/icons/Close.svg" alt="close burger menu" />
          ) : (
            <img src="img/icons/Menu.svg" alt="burger menu" />
          )}
        </button>
      </header>
      {open && <BurgerMenu open={open} setOpen={setOpen} />}
    </>
  );
};
