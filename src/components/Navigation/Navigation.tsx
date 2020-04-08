import React, { FC } from 'react';
import './_Navigation.scss';
import { NavLink } from 'react-router-dom';

export const Navigation: FC = () => (
  <nav className="nav">
    <ul className="nav__list-left">
      <li className="nav__item">
        <NavLink
          className="nav__link-left"
          to="/"
          activeClassName="nav__link-left--active"
          exact
        >
                  home
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          className="nav__link-left"
          to="/phones"
          activeClassName="nav__link-left--active"
        >
                phones
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          className="nav__link-left"
          to="/tablets"
          activeClassName="nav__link-left--active"
          exact
        >
                tablets
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink
          className="nav__link-left"
          to="/accessories"
          activeClassName="nav__link-left--active"
          exact
        >
                accessories
        </NavLink>
      </li>
    </ul>
    <ul className="nav__list-right">
      <li className="nav__item-input">
        <input
          type="text"
          className="nav__search"
          placeholder="Search....."
        />
      </li>
      <li className="nav__item-right">
        <NavLink
          className="nav__link-right"
          to="/favourites"
          activeClassName="nav__link-right--active"
        >
          <img
            src="/img/header/heart.svg"
            alt="link_to_favourites"
            className="nav__favourites"
          />
        </NavLink>
      </li>
      <li className="nav__item-right">
        <NavLink
          className="nav__link-right"
          to="/cart"
          activeClassName="nav__link-right--active"
        >
          <img
            src="/img/header/shopcart.svg"
            alt="link_to_cart"
            className="nav__store"
          />
        </NavLink>
      </li>
    </ul>
  </nav>
);
