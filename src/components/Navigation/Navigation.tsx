import React from 'react';
import classNames from 'classnames';
import './Navigation.scss';

import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = React.memo(() => (
  <nav className="nav header__nav">
    <NavLink
      to="/"
      className={({ isActive }) => (
        classNames('link', 'nav__link', { 'link--is-selected': isActive })
      )}
    >
      Home
    </NavLink>
    <NavLink
      to="/phones"
      className={({ isActive }) => (
        classNames('link', 'nav__link', { 'link--is-selected': isActive })
      )}
    >
      Phones
    </NavLink>
    <NavLink
      to="/tablets"
      className={({ isActive }) => (
        classNames('link', 'nav__link', { 'link--is-selected': isActive })
      )}
    >
      Tablets
    </NavLink>
    <NavLink
      to="/accessories"
      className={({ isActive }) => (
        classNames('link', 'nav-link', { 'link--is-selected': isActive })
      )}
    >
      Accessories
    </NavLink>
  </nav>
));
