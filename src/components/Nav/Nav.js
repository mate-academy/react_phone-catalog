import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ quantityPhones }) => (
  <nav className="nav">
    <ul className="nav__list">
      <li>
        <NavLink
          className="nav__item"
          activeClassName="nav__item--active"
          to="/"
          exact
        >
          Home Page
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav__item"
          activeClassName="nav__item--active"
          to="/phones"
          exact
        >
          Phones Page
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav__item"
          activeClassName="nav__item--active"
          to="/basket"
        >
          Basket&nbsp;
          {quantityPhones > 0 && `(${quantityPhones})`}
        </NavLink>
      </li>
    </ul>
  </nav>
);

const mapStateToProps = state => ({
  quantityPhones: Object.keys(state.basketItems)
    .map(key => (
      state.basketItems[key].count
    ))
    .reduce((sum, currentValue) => (
      sum + currentValue
    ), 0),
});

Nav.propTypes = {
  quantityPhones: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Nav);
