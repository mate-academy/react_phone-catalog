import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

export const Nav = () => (
  <nav className="Nav">
    <ul className="Nav__List">
      <li className="Nav__Item">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="Nav__Item">
        <NavLink to="/phones">Phones</NavLink>
      </li>
      <li className="Nav__Item">
        <NavLink to="/tablets">Tablets</NavLink>
      </li>
      <li className="Nav__Item">
        <NavLink to="/accessories">Accessories</NavLink>
      </li>
    </ul>
  </nav>
);
