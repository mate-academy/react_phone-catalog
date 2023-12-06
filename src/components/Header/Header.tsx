/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavBar } from '../NavBar';
import './Header.scss';

type Props = {
  toggleMenu: () => void,
};

export const Header: React.FC<Props> = ({ toggleMenu }) => (
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

        <button
          className="header__menu"
          onClick={toggleMenu}
        >
          <div className="icon icon__menu" />
        </button>
      </div>
    </div>
  </header>
);
