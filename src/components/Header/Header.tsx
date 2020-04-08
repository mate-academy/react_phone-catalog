import React from 'react';
import './Header.scss';
import {
  NavLink,
} from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-nav">
          <NavLink to="/" className="main-logo">
            <img
              src="img/Apple-logo.png"
              alt="logo"
              className="main-logo__image"
            />
          </NavLink>
          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__item">
                <NavLink
                  to="/"
                  exact
                  className="navigation__link"
                  activeClassName="navigation__link-active"
                >
                  Home
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/phones"
                  className="navigation__link"
                  activeClassName="navigation__link-active"
                >
                  Phones
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/tables"
                  className="navigation__link"
                  activeClassName="navigation__link-active"
                >
                  Tables
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/accessories"
                  className="navigation__link"
                  activeClassName="navigation__link-active"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
          <label className="header-nav__label">
            <input
              type="text"
              className="header-nav__search"
              placeholder="Search"
            />
          </label>
          <div className="header-nav__likes" />
          <div className="header-nav__cart" />
        </div>
      </div>
    </header>
  );
};
