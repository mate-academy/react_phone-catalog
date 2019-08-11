import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ basketPhones }) => (
  <nav className="navigation">
    <Link
      to="/"
      className="navigation__logo-container"
    >
      <img
        src="./img/logo.svg"
        className="navigation__logo"
        alt="logo"
      />
    </Link>

    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink
          to="/"
          exact
          className="navigation__link"
        >
          Home
        </NavLink>
      </li>

      <li className="navigation__item">
        <NavLink
          to="/phones"
          className="navigation__link"
        >
          Phones
        </NavLink>
      </li>

      <li className="navigation__item">
        <NavLink
          to="/basket"
          className="navigation__link"
        >
          Basket
          <span className="navigation__basket-quatity">
            {basketPhones.length}
          </span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
