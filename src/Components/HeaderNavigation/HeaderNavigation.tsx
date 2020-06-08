import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNavigation.scss';

import Nav from './Nav/Nav';

const HeaderNavigation: React.FC = () => {
  return (
    <>
      <header className="header">
        <NavLink to="/home" className="header__logo">
          <img src="./img/logo.svg" alt="logo" className="logo" />
        </NavLink>
        <Nav />
        <div className="header__icons">
          <NavLink to="/favourites" className="header__favourites header__icon" activeClassName="header__link--active" />
          <NavLink to="/cart" className="header__cart header__icon" activeClassName="header__link--active" />
        </div>
      </header>
    </>
  );
};

export default HeaderNavigation;
