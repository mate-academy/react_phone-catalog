import React from 'react';
import { NavLink } from 'react-router-dom';
import { GIT_HUB_H2ASH } from './constants';

const Navbar = ({ itemsAtBasket }) => (
  <nav className="header">
    <NavLink
      className="header_wrapper-logo"
      href="#"
      to="/"
    >
      <img
        className="header__logo"
        src={`${GIT_HUB_H2ASH}/react_phone-catalog/img/logo.svg`}
        alt="logo"
      />
    </NavLink>

    <ul className="header__ul">
      <li className="header__li">
        <NavLink
          className="header__link link"
          href="#"
          exact
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li className="header__li">
        <NavLink
          className="header__link link"
          href="#"
          to="/phones/"
        >
          Phones
        </NavLink>
      </li>

      <li className="header__li">
        <NavLink
          className="header__link link"
          href="#"
          to="/basket/"
        >
        Basket
          <span className="header__basket-quantity">
            {
              itemsAtBasket.length
            }
          </span>
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Navbar;