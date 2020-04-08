import React, { FC } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/phones" exact>Phones</NavLink>
      </nav>
    </header>
  );
};