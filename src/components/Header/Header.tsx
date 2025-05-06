import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo"></img>
        <nav className="header__menu menu">
          <NavLink to="/" className="menu__item">
            home
          </NavLink>
          <NavLink to="/phones" className="menu__item">
            Phones
          </NavLink>
          <NavLink to="/tables" className="menu__item">
            tablets
          </NavLink>
          <NavLink to="/accessories" className="menu__item">
            accessories
          </NavLink>
        </nav>
        <div className="header">Header</div>
        <div className="header">Header</div>
      </div>
    </header>
  );
};
