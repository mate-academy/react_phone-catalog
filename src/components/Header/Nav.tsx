import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav: React.FC = () => {
  return (
    <nav className="header__nav">
      <ul>
        <li className="header__link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/phones"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
