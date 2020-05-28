import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav--left">
          <Link to="/">
            <img src="./img/logo.svg" alt="logo" />
          </Link>

          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className="link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/Phones"
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/Tablets"
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/Accesories"
              >
                Accesories
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav--right">
          <NavLink
            to="/favourites"
            className="nav__icon nav__icon--favourites"
          />
          <NavLink
            to="/cart"
            className="nav__icon nav__icon--cart"
          />
        </div>
      </nav>
    </header>
  );
};
