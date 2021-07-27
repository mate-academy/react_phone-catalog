import React from "react";
import './Header.scss'
import { NavLink, Route } from "react-router-dom";
import '../../components/SearchBar'
import { SearchBar } from "../../components/SearchBar";

export const Header: React.FC = () => (
  <header className="header">
    <nav className="header__nav">
      <ul className="nav__link-list">
        <li className="link-list__link-container">
          <div className='logo'>
            LOGO
          </div>
        </li>
        <li className="link-list__link-container">
          <NavLink
            exact
            to="/"
            className="link"
            activeClassName="is-active"
          >
            Home
          </NavLink>
        </li>
        <li className="link-list__link-container">
          <NavLink
            to="/phones"
            className="link"
            activeClassName="is-active"
          >
            Phones
          </NavLink>
        </li>
        <li className="link-list__link-container">
          <NavLink
            to="/tablets"
            className="link"
            activeClassName="is-active"
          >
            Tablets
          </NavLink>
        </li>
        <li className="link-list__link-container">
          <NavLink
            to="/accessories"
            className="link"
            activeClassName="is-active"
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__link-list">
        <Route path="/phones">
          <SearchBar
            placeholder="Search in phones..."
          />
        </Route>
        <Route path="/tablets">
          <SearchBar
            placeholder="Search in tablets..."
          />
        </Route>
        <Route path="/accessories">
          <SearchBar
            placeholder="Search in accessories..."
          />
        </Route>
        <NavLink
          to="/cart"
          className="link-list__square-nav-link"
          activeClassName="is-active"
        >
          <i className="cart-icon"/>
        </NavLink>
        <NavLink
          to="/favorites"
          className="link-list__square-nav-link"
          activeClassName="is-active"
        >
          <i className="heart-icon"/>
        </NavLink>
      </ul>
    </nav>
  </header>
)
