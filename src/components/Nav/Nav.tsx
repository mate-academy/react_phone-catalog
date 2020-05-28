import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';


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
            HOME
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/phones"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            PHONES
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/tablets"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            TABLETS
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/accessories"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            ACCESSORIES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
