import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

const sectionLinks: SectionLink[] = [
  {
    name: 'Home',
    url: '/',
    exact: true,
  },
  {
    name: 'Phones',
    url: '/phones',
  },
  {
    name: 'Tablets',
    url: '/tablets',
  },
  {
    name: 'Accessories',
    url: '/accessories',
  },
];

export const Nav = () => (
  <nav className="Nav">
    <ul className="Nav__List">
      {sectionLinks.map(({ name, url, exact }) => (
        <li className="Nav__Item">
          <NavLink
            to={url}
            exact={exact}
            className="Nav__Link"
            activeClassName="Nav__Link--active"
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
