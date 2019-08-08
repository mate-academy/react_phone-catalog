import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ basketPhones }) => (
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
        Basket:
        <span>{basketPhones.length}</span>
      </NavLink>
    </li>
  </ul>
);

Navigation.propTypes = {
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
