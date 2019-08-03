import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

const Header = () => {

  return (
    <header className="header-container">
      <div className="logo">This is LOGO</div>
      <nav className="nav-links">
        <ul className="nav-items">
          <NavLink to="/" exact>
            <li className="nav-item">Home</li>
          </NavLink>
          <NavLink to="/phones">
            <li className="nav-item">Phones</li>
          </NavLink>
          <NavLink to="/cart">
            <li className="nav-item cart-item">&#x1F6D2;</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
