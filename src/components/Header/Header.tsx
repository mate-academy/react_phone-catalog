import React from 'react';
import styles from './Header.module.scss';

import favoriteIcon from './../../images/icons/Favourites (Heart Like).svg';
import cartIcon from './../../images/icons/Shopping bag (Cart).svg';
import logoIcon from './../../images/header/Logo.png';

const {
  header,
  header__container,
  header__logo,
  header__menu,
  menu,
  menu__item,
  active,
} = styles;

const getActiveClass = ({ isActive }: { isActive: boolean }): string =>
  `${menu__item} ${isActive ? active : ''}`;

import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
export const Header = () => {
  return (
    <header className={header}>
      <div className={header__container}>
        <img src={logoIcon} className={header__logo}></img>
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
        <div className="header__buttons">
          <Link to="/favorite">
            <img
              src={cartIcon}
              alt="favorite-icon"
              className="header__favorite"
            />
          </Link>
          <Link to="/cart">
            <img src={favoriteIcon} alt="cart-icon" className="header__cart" />
          </Link>
        </div>
      </div>
    </header>
  );
};
