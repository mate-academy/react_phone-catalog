import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const Header = ({ basketItems }) => (
  <>
    <nav>
      <ul className="navbar">
        <div className="navbar__main-points">

          <li>
            <NavLink className="navlink" to="/" exact>
              <img
                className="logo-img"
                src="images/logo.png"
                alt="Logo"
                title="Logo"
              />
            </NavLink>
          </li>

          <li>
            <NavLink
              className="navlink"
              to="/"
              activeClassName="active-navlink"
              exact
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navlink"
              to="/phones/"
              activeClassName="active-navlink"
            >
              Phones
            </NavLink>
          </li>

        </div>

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary no-border" type="button">
              <img
                className="search-img"
                src="images/search.svg"
                alt="search"
                title="search"
              />
            </button>
          </div>
          <input
            type="text"
            className="form-control border-bottom"
            placeholder="What are you looking for?"
            aria-label=""
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="basket-content">

          <li>
            <NavLink
              className={classnames({
                navlink: true,
                "active-basket": basketItems.length > 0,
              })}
              to="/basket/">
              <img
                className="basket-img"
                src="images/basket.svg"
                alt="basket"
                title="basket"
              />
              My basket({basketItems.length})
            </NavLink>
          </li>

        </div>
      </ul>
    </nav>
  </>
)

export default Header;
