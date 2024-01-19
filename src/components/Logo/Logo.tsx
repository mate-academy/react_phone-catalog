import React from 'react';
import './Logo.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../images/icons/Logo.svg';

export const Logo: React.FC = () => {
  return (
    <NavLink to="/" className="Logo">
      <img
        src={logo}
        alt="Logo"
        className="Logo__img"
      />
    </NavLink>
  );
};
