import React from 'react';
import { NavLink } from 'react-router-dom';
import logoIcon from '../../images/icons/Logo.svg';
import './Logo.scss';

export const Logo: React.FC = () => (
  <NavLink to="/" className="Logo">
    <img
      src={logoIcon}
      alt="Logo"
      className="Logo__img"
    />
  </NavLink>
);
