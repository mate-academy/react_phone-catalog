import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';

export const Navigation = () => {
  return (
    <nav className="Nav">
      <div className="Nav__left">
        <img className="Nav__logo" alt="logo" src="img/icons/logo.svg" />
        <ul className="Nav__list">
          <li className="Nav__list_item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__link_active"
              to="/"
              exact
            >
              HOME
            </NavLink>
          </li>
          <li className="Nav__list_item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__link_active"
              to="/phones"
            >
              PHONES
            </NavLink>
          </li>
          <li className="Nav__list_item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__link_active"
              to="/tablets"
            >
              TABLETS
            </NavLink>
          </li>
          <li className="Nav__list_item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__link_active"
              to="/accessories"
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Nav__right">
        <NavLink to="/favourites" className="Nav__right_link">
          <img
            className="Nav__right_icon"
            alt="favourites"
            src="img/icons/fav.svg"
          />
        </NavLink>
        <NavLink to="/cart" className="Nav__right_link">
          <img className="Nav__right_icon" alt="cart" src="img/icons/cart.svg" />
        </NavLink>
      </div>
    </nav>
  );
};
