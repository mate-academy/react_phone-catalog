import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';

const Nav = ({ totalBasketItems }) => (
  <nav className="nav">
    <ul>
      <li>
        <NavLink to="/" exact>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{
            pathname: '/phones/',
            search: '?&query=&sort=',
          }}
        >
          <span>Store</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/basket">
          <span>Basket </span>
          {
            totalBasketItems > 0
              ? (
                <span className="badge badge-pill badge-dark">
                  {totalBasketItems}
                </span>
              )
              : ''
          }
        </NavLink>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  totalBasketItems: PropTypes.number.isRequired,
};

export default Nav;
