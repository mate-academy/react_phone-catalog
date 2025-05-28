import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import favoriteIcon from './../../images/icons/Favourites (Heart Like).svg';
import cartIcon from './../../images/icons/Shopping bag (Cart).svg';
import burgerIcon from './../../images/icons/burger.svg';
import closeIcon from './../../images/icons/close.svg';
import logoIcon from './../../images/header/Logo.png';

const {
  header,
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
  const [isActive, setIsActive] = useState(false);

  return (
    <header className={`${header} ${isActive ? header__active : ''}`}>
      <div className={header__container}>
        <div className={header__logo}>
          <img src={logoIcon}></img>
        </div>
        <nav className={header__menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${header__menu_item} ${isActive ? active : ''}`
            }
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${header__menu_item} ${isActive ? active : ''}`
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tables"
            className={({ isActive }) =>
              `${header__menu_item} ${isActive ? active : ''}`
            }
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${header__menu_item} ${isActive ? active : ''}`
            }
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
          >
            <img
              src={favoriteIcon}
              alt="favorite-icon"
              className={header__icon}
            />
            {/* <span className={header__counter}>{12}</span> */}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${header__button} ${isActive ? active : ''}`
            }
          >
            <img src={cartIcon} alt="cart-icon" className={header__icon} />
            {/* <span className={header__counter}>{12}</span> */}
          </NavLink>
        </div>
        <button
          className={header__burger}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <img src={closeIcon} alt="burger-menu" />
          ) : (
            <img src={burgerIcon} alt="burger-menu" />
          )}
        </button>
      </div>
    </header>
  );
};
