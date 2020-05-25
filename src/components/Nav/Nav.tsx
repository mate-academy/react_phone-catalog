import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

interface Props {
  links: Link[];
}

export const Nav: React.FC<Props> = ({ links }) => (
  <nav className="Nav">
    <ul className="Nav__List">
      {links.map(({ name, url, exact }) => (
        <li className="Nav__Item" key={name}>
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
