import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './NavBar.scss';

export const NavBar: React.FC = () => (
  <nav className="nav">
    <NavLink
      className={({ isActive }) => (
        classNames('nav__link', {
          'nav__is-active': isActive,
        })
      )}
      to="/home"
    >
      Home
    </NavLink>

    <NavLink
      className={({ isActive }) => (
        classNames('nav__link', {
          'nav__is-active': isActive,
        })
      )}
      to="/phones"
    >
      Phones
    </NavLink>

    <NavLink
      className={({ isActive }) => (
        classNames('nav__link', {
          'nav__is-active': isActive,
        })
      )}
      to="/tablets"
    >
      Tablets
    </NavLink>

    <NavLink
      className={({ isActive }) => (
        classNames('nav__link', {
          'nav__is-active': isActive,
        })
      )}
      to="/accessories"
    >
      Accessories
    </NavLink>
  </nav>
);
