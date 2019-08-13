import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ selectedPhones }) => (
  <header>
    <nav className="navigation">
      <ul>
        <li className="navigation__list-paragraph">
          <NavLink
            to="/"
            exact
            className="navigation__link"
            activeClassName="is-active"
          >
            Home
          </NavLink>
        </li>

        <li className="navigation__list-paragraph">
          <NavLink
            to={{
              pathname: '/phones',
              search: 'page=1&perPage=8&sort=age',
            }}
            exact
            className="navigation__link"
            activeClassName="is-active"
          >
            Phones
          </NavLink>
        </li>
      </ul>
      <div className="navigation__list-paragraph">
        <NavLink
          to="/basket"
          exact
          className="navigation__link basket"
          activeClassName="is-active"
        >
          <img
            src="img/basket.png"
            className="basket__img"
            alt="basket"
          />
        </NavLink>

        {selectedPhones.length > 0
          ? (
            <span className="basket__added-items-quantity">
              {selectedPhones.length}
            </span>
          ) : <></>
        }
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
