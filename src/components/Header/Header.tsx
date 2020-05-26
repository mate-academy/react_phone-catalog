import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar.tsx';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header" id="top">
      <div className="header__menu">
        <Link to="/" className="header__logo">
          <img src="./img/LOGO.svg" alt="LOGO" />
        </Link>
        <Navbar />
      </div>
      <div className="header__links">
        <NavLink to="/favorites" className="header__link" activeClassName="header__link--active">
          <img src="./img/favorites-icon.svg" alt="favorites" />
        </NavLink>
        <NavLink to="/cart" className="header__link" activeClassName="header__link--active">
          <img src="./img/cart-icon.svg" alt="cart" />
        </NavLink>
      </div>

    </header>
  );
};
