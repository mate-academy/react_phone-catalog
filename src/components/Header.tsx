import React, { FC } from 'react';
import {
  HashRouter,
  NavLink,
} from 'react-router-dom';

const Header: FC = () => {
  return (
    <HashRouter>
      <nav className="nav">
        <img
          src={`${window.location.origin}/img/logo.svg`}
          alt="Logo"
          className="nav__logo"
        />
        <ul className="nav__links">
          <NavLink
            to="/"
            exact
            activeClassName="nav__selected"
            className="nav__items"
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Tablets
          </NavLink>
          <NavLink
            to="accessories"
            activeClassName="nav__selected"
            className="nav__items"
          >
            Accessories
          </NavLink>
        </ul>
        <div className="nav__fav-cart-container">
          <NavLink
            to="/favs"
            activeClassName="nav__selected--1"
            className="nav__items"
          >
            <img
              src={`${window.location.origin}/img/favourites.svg`}
              alt="Favourites"
              className="nav__favourites"
            />
          </NavLink>
          <NavLink
            to="/cart"
            activeClassName="nav__selected--1"
            className="nav__items"
          >
            <img
              src={`${window.location.origin}/img/cart.svg`}
              alt="Shopping bag"
              className="nav__cart"
            />
          </NavLink>
        </div>
      </nav>
    </HashRouter>
  );
};

export default Header;
