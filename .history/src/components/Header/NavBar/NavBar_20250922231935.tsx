import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>
      {' | '}
      <NavLink to="/phones">PHONES</NavLink>
      {' | '}
      <NavLink to="/tablets">TABLETS</NavLink>
      {' | '}
      <NavLink to="/accessories">ACCESSORIES</NavLink>
    </nav>
  );
};
