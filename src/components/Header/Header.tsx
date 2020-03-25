import React, { FC } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__logo" />
      <nav className="header__nav nav">
        <NavLink to="/" exact className="nav__link">Home</NavLink>
        <NavLink to="/phones" exact className="nav__link">Phones</NavLink>
      </nav>
    </header>
  );
};
