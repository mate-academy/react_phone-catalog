import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';
import {
  CART_ICON,
  FAVOURITES_ICON,
  LOGO_URL,
} from '../Additionals/additional_api';


export const Navigation = () => {
  return (
    <nav className="Nav">
      <div className="Nav__left">
        <img className="Nav__logo" alt="logo" src={LOGO_URL} />
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
            src={FAVOURITES_ICON}
          />
        </NavLink>
        <NavLink to="/cart"  className="Nav__right_link">
          <img className="Nav__right_icon" alt="cart" src={CART_ICON} />
        </NavLink>
      </div>
    </nav>
  );
};
