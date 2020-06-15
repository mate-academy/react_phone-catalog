import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

type NavLinks = {
  path: string;
  text: string;
};

const NAV_LINKS = [
  { path: '/home', text: 'HOME' },
  { path: '/phones', text: 'PHONES' },
  { path: '/tablets', text: 'TABLETS' },
  { path: '/accessories', text: 'ACCESSORIES' },
];


export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {NAV_LINKS.map((link: NavLinks) => (
          <li
            key={link.path}
            className="nav__item"
          >
            <NavLink
              to={link.path}
              exact
              className="nav__link"
              activeClassName="nav__link--active"
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
