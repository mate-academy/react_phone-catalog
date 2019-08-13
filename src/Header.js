import { NavLink, Link } from 'react-router-dom';
import React from 'react';
import Basket from './Basket';

const Header = () => (
  <header className="head">

    <ul>
      <li>
        <NavLink
          to="/"
          exact
          className="header-link"
          activeClassName="active-link"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/phones"
          className="header-link"
          activeClassName="active-link"
        >
          Phones
        </NavLink>
      </li>
    </ul>

    <Link to="/basket" className="basket">
      <Basket />
    </Link>

  </header>
);

export default Header;
