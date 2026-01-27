import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import favoriteIcon from './../../images/icons/Favourites-like.svg';
import cartIcon from './../../images/icons/Shopping bag (Cart).svg';
import burgerIcon from './../../images/icons/burger.svg';
import closeIcon from './../../images/icons/close.svg';
import logoIcon from './../../images/header/Logo.png';
import { useCartFavorite } from '../../context/CartFavoriteContext';

/* eslint-disable @typescript-eslint/naming-convention */

const {
  header,
  header__wrapper,
  header__container,
  header__logo,
  header__menu,
  header__buttons,
  header__button,
  header__icon,
  header__counter,
  header__burger,
  header__menu_item,
  active,
  header__active,
} = styles;

export const Header = () => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const { favoriteItems, cartItems } = useCartFavorite();

  return (
    <header className={`${header} ${isActiveLink ? header__active : ''}`}>
      <div className={header__container}>
        <div className={header__wrapper}>
          <Link
            to="/"
            className={header__logo}
            onClick={() => setIsActiveLink(false)}
          >
            <img src={logoIcon} alt="logo"></img>
          </Link>
          <nav className={header__menu}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${header__menu_item} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              home
            </NavLink>
            <NavLink
              end
              to="/phones"
              className={({ isActive }) =>
                `${header__menu_item} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              Phones
            </NavLink>
            <NavLink
              end
              to="/tablets"
              className={({ isActive }) =>
                `${header__menu_item} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              tablets
            </NavLink>
            <NavLink
              end
              to="/accessories"
              className={({ isActive }) =>
                `${header__menu_item} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              accessories
            </NavLink>
          </nav>
          <div className={header__buttons}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${header__button} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              <img
                src={favoriteIcon}
                alt="favorite-icon"
                className={header__icon}
              />
              {favoriteItems.length > 0 && (
                <span className={header__counter}>{favoriteItems.length}</span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${header__button} ${isActive ? active : ''}`
              }
              onClick={() => setIsActiveLink(false)}
            >
              <img src={cartIcon} alt="cart-icon" className={header__icon} />
              {cartItems.length > 0 && (
                <span className={header__counter}>{cartItems.length}</span>
              )}
            </NavLink>
          </div>
          <button
            className={header__burger}
            onClick={() => setIsActiveLink(!isActiveLink)}
          >
            {isActiveLink ? (
              <img src={closeIcon} alt="burger-menu" />
            ) : (
              <img src={burgerIcon} alt="burger-menu" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
