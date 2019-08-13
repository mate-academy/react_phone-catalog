import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav className="nav">
    <ul>
      <li>
        <NavLink to="/" exact>Home page</NavLink>
      </li>
      <li>
        <NavLink
          to={{
            pathname: '/phones',
            search: '?&query=&sort=',
          }}
        >
          Phones page
        </NavLink>
      </li>

    </ul>
  </nav>
);

export default Nav;
