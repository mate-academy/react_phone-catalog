import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import favoriteIcon from './../../images/icons/Favourites (Heart Like).svg';
import cartIcon from './../../images/icons/Shopping bag (Cart).svg';
import burgerIcon from './../../images/icons/burger.svg';
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
  header__logoo,
  menu,
  menu__item,
  active,
} = styles;

const getActiveClass = ({ isActive }: { isActive: boolean }): string =>
  `${menu__item} ${isActive ? active : ''}`;

export const Header = () => {
  return (
    <header className={header}>
      <div className={header__container}>
        <div className={header__logo}>
          <img src={logoIcon}></img>
        </div>
        <nav className={`${header__menu} ${menu}`}>
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
            {/* <span className={header__counter}>{12}</span> */}
          </Link>
          <Link to="/cart" className={header__button}>
            <img src={cartIcon} alt="cart-icon" className={header__icon} />
            {/* <span className={header__counter}>{12}</span> */}
          </Link>
        </div>
        <button className={header__burger}>
          <img src={burgerIcon} alt="burger-menu" />
        </button>
      </div>
    </header>
  );
};
