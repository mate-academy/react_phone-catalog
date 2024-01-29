import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navigation } from './Navigation';

import '../styles/Header.scss';
import '../styles/logo.scss';

export const Header: React.FC = () => {
  return (
    <header className="header" id="header">
      <div className="header__left-block">
        <Link to="/" className="logo" />

        <Navigation />
      </div>

      <div className="header__right-block">
        <div className="header__favcar-block">
          <NavLink to="/favourites" className="favourites-icon" />
        </div>

        <div className="header__favcar-block">
          <NavLink to="/cart" className="shopping-cart-icon" />
        </div>
      </div>
    </header>
  );
};
