import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';

import logo from '../../images/logo.svg';
import favoritesImg from '../../images/header-buttons/favorites-default.svg';
import bagImg from '../../images/header-buttons/shopping-bag.svg';

import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>

        <ul className="header__menu">
          <li className="header__item">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Phones
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Tablets
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        <NavLink to="/favorites" className="header__button">
          <img
            src={favoritesImg}
            alt="favorites"
            className="header__button-image"
          />
        </NavLink>
        <NavLink to="/cart" className="header__button">
          <img src={bagImg} alt="cart" className="header__button-image" />
        </NavLink>
      </div>
    </header>
  );
};
