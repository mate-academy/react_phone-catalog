import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { BurgerMenu } from '../BurgerMenu';
// import { useFavorites } from '../../context/Favorites/FavoritesContext';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  // const { favorites } = useFavorites();

  const handleOpenMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <header className="header">
        <NavLink to="/">
          <img
            className="header__logo"
            src="/img/logo-img.svg"
            alt="logo image"
          />
        </NavLink>

        <div className="header__container">
          <nav className="header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header__link header__link--home ${isActive ? 'header__link--active' : ''}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : 'header__link'}`
              }
            >
              PHONES
            </NavLink>
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : 'header__link'}`
              }
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : 'header__link'}`
              }
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className="header__button">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `header__button-link ${isActive ? 'header__button-link--active' : ''}`
              }
            >
              <img src="/img/icons/icon-favourites.svg" alt="favourites" />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `header__button-link ${isActive ? 'header__button-link--active' : ''}`
              }
            >
              <img src="/img/icons/icon-cart.svg" alt="cart" />
            </NavLink>
          </div>
        </div>
        <button
          className="burger-button"
          aria-label="Toggle menu"
          onClick={handleOpenMenu}
        >
          {open ? (
            <img src="/img/icons/close-menu.svg" alt="close burger menu" />
          ) : (
            <img src="/img/icons/menu.svg" alt="burger menu" />
          )}
        </button>
      </header>
      {open && <BurgerMenu setOpen={setOpen} />}
    </>
  );
};
