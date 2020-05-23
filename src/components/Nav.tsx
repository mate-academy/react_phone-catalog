import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            exact
            className="nav__link"
            activeClassName="nav__link--active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/phones"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/tablets"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            Tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/accessories"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
