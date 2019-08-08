/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ orderedPhonesLength }) => (
  <header className="header-container">
    <div className="header-logo">
      <Link to="/">
        <img src="./img/logo.png" alt="logo_mobile-phones" />
      </Link>
    </div>
    <nav className="nav-links">
      <ul className="nav-items">
        <NavLink to="/" exact>
          <li className="nav-item">Home</li>
        </NavLink>
        <NavLink to="/phones">
          <li className="nav-item">Phones</li>
        </NavLink>
        <NavLink to="/cart">
          <li className="nav-item cart-item">
            <img
              className="cart-icon"
              src={orderedPhonesLength < 1
                ? './img/empty-cart.png'
                : './img/full-cart.png'}
              alt="shopping-cart"
            />
          </li>
        </NavLink>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  orderedPhonesLength: PropTypes.number.isRequired,
};

export default Header;
