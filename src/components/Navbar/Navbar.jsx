import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GIT_HUB_H2ASH } from '../../lib/constants';

const Navbar = ({ itemsInBasket }) => (
  <header className="header">
    <NavLink
      href="#"
      to="/"
    >
      <img
        className="header__logo"
        src={`${GIT_HUB_H2ASH}/react_phone-catalog/img/logo.svg`}
        alt="logo"
      />
    </NavLink>

    <nav>
      <ul className="header__nav">
        <li>
          <NavLink
            activeClassName="link link--header link--header_active"
            className="link link--header"
            href="#"
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName="link link--header link--header_active"
            className="link link--header"
            href="#"
            to={{
              pathname: '/phones',
              search: '',
            }}
          >
            Phones
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName="link link--header link--header_active"
            className="link link--header"
            href="#"
            to="/basket"
          >
          Basket
            <span className="header__basket-quantity">
              {
                itemsInBasket.length
              }
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

Navbar.propTypes = {
  itemsInBasket: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navbar;
