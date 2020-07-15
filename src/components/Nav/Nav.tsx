import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

export const Nav = () => (
  <nav className="nav">
    <div className="nav__container container-header">

      <ul className="nav__list nav__left">
        <li className="nav__list-item">
          <NavLink to='/' className="nav__logo"></NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to='/' className="nav__link" exact>
            Home
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to='/phones' className="nav__link">
            Phones
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to='/tablets' className="nav__link">
            Tablets
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to='/accessories' className="nav__link">
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__list nav__right">
        <li className="nav__list-icon">
          <NavLink to='/favorites' className="nav__favorites"></NavLink>
        </li>
        <li className="nav__list-icon">
          <NavLink to='/cart' className="nav__cart"></NavLink>
        </li>
      </ul>

    </div>
  </nav>
);
