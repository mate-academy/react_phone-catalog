import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavBar } from '../NavBar';
import './Header.scss';

export const Header: React.FC = () => (
  <header className="header">
    <div className="container">
      <div className="header__content">
        <div className="header__logo-nav-bar">
          <NavLink
            className="header__logo-link"
            to="/"
          >
            <div className="header__logo icon-logo" />
          </NavLink>

          <div className="header__nav">
            <NavBar />
          </div>
        </div>

        <div className="header__favorites-cart">
          <NavLink
            className={classNames('header__favorites-cart-link')}
            to="/favorites"
          >
            <div className="header__favorites-icon icon icon__favorites" />
          </NavLink>

          <NavLink
            className={classNames('header__favorites-cart-link')}
            to="/cart"
          >
            <div className="header__favorites-icon icon icon__cart" />
          </NavLink>
        </div>

        <div className="header__menu icon icon__menu" />
      </div>
    </div>
  </header>
);
