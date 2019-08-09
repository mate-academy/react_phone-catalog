import React from 'react';
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="head">

      <ul>
        <li>
          <NavLink
            to="/"
            exact
            className="header-link"
            activeClassName="active-link"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/phones"
            className="header-link"
            activeClassName="active-link"
          >
            Phones
         </NavLink>

        </li>
      </ul>

      <Link to={"/basket"} className ="basket">
  <img className="basket-image" src="./img/icos/cart4.png" /></Link>


    </header>
  )
}

export default Header;
