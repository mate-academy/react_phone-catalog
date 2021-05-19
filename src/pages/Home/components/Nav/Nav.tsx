import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavType } from '../../../../helpers/types';
import './Nav.scss';

export const Nav: React.FC<NavType> = ({ navLinks, navType }) => (
  <nav className="Navbar">
    {navLinks.map((nav) => (
      nav.typeOfLink === 'outside'
        ? (
          <a
            key={nav.id}
            className="Navbar-Link"
            href={nav.url}
          >
            {nav.name}
          </a>
        )
        : (
          <NavLink
            key={nav.id}
            to={nav.url}
            exact
            className="Navbar-Link"
            activeClassName={navType === 'header'
              ? 'Navbar-Link_active'
              : ''}
          >
            {nav.name}
          </NavLink>
        )))}

  </nav>
);
