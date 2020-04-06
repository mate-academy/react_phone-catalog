import React from 'react';
import './Header.scss';
import './Navigation.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__header-wrapper">
        <nav className="header__nav nav">
          <div className="header__logo">
            <p className="header__logo-heading">Apple</p>
            <p className="header__logo-underheading">drocher</p>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/phones"
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/tablets"
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__menu">
          <input type="text" className="header__search" />
          <NavLink className="header__favorite" to="/"> favorite </NavLink>
          <NavLink className="heder__basket" to="/">basket</NavLink>
        </div>
      </div>
    </header>
  );
};
