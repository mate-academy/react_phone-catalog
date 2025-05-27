import React, { useState } from 'react';
import styles from './NavMenu.module.scss';
import { Link, NavLink } from 'react-router-dom';

import favoriteIcon from './../../images/icons/Favourites (Heart Like).svg';
import cartIcon from './../../images/icons/Shopping bag (Cart).svg';
import burgerIcon from './../../images/icons/burger.svg';
import closeIcon from './../../images/icons/close.svg';
import logoIcon from './../../images/header/Logo.png';

const {
  header__menu,
  menu,
  menu__item,
  active,
  header__buttons,
  header__button,
  header__icon,
  header__burger,
  header__counter,
  header__logo,
  menu__active,
} = styles;

const getActiveClass = ({ isActive }: { isActive: boolean }): string =>
  `${menu__item} ${isActive ? active : ''}`;

export const NavMenu = () => {
  const [isACtive, setIsActive] = useState(false);

  return (
    <>
      <div className={header__logo}>
        <img src={logoIcon}></img>
      </div>
      <nav
        className={`${header__menu} ${menu} ${isACtive ? menu__active : ''}`}
      >
        <NavLink to="/" className={menu__item}>
          home
        </NavLink>
        <NavLink to="/phones" className={getActiveClass}>
          Phones
        </NavLink>
        <NavLink to="/tables" className={getActiveClass}>
          tablets
        </NavLink>
        <NavLink to="/accessories" className={getActiveClass}>
          accessories
        </NavLink>
      </nav>
      <div className={header__buttons}>
        <Link to="/favorite" className={header__button}>
          <img
            src={favoriteIcon}
            alt="favorite-icon"
            className={header__icon}
          />
          <span className={header__counter}>{12}</span>
        </Link>
        <Link to="/cart" className={header__button}>
          <img src={cartIcon} alt="cart-icon" className={header__icon} />
          {/* <span className={header__counter}>{12}</span> */}
        </Link>

        <button
          className={header__burger}
          onClick={() => setIsActive(!isACtive)}
        >
          {isACtive ? (
            <img src={closeIcon} alt="burger-menu" />
          ) : (
            <img src={burgerIcon} alt="burger-menu" />
          )}
        </button>
      </div>
    </>
  );
};
