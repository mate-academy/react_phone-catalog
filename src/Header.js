import React from 'react';
import Basket from './Basket';
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

      <form>
        <input size="30" placeholder="try to find something" className="searchPhone" type="search" name="searchfield" />
        <button className="searchSubmit" type="submit">Go</button>
      </form>

      <Link to={"/basket"} className="basket">
        <Basket />
      </Link>


    </header>
  )
}

export default Header;
