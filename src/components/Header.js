/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
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
            <span role="img">&#x1F6D2;</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  </header>
);

export default Header;
