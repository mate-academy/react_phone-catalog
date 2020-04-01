import React from 'react';
import './Header.scss';

import { Link, NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <nav className="nav">
      <Link to="/" className="nav__logo">
        <img src="img/Logo_lol.svg" alt="Logo"/>
      </Link>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/phones">
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/tablets">
            tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/accessories">
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
