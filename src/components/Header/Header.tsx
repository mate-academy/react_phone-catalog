import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__nav--log--box">
        <div className="header__logo"/>
        <nav className="nav header__nav">
          <ul className="nav__list">

            <li className="nav__item">
              <NavLink
                to="/HomePage"
                activeClassName="nav__link--active"
                className="nav__link"
              >
                home
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/PhonesPage"
                activeClassName="nav__link--active"
                className="nav__link"
              >
                phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/TabletsPage"
                activeClassName="nav__link--active"
                className="nav__link"
              >
                tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/AccessoriesPage"
                activeClassName="nav__link--active"
                className="nav__link"
              >
                accessories
              </NavLink>
            </li>

          </ul>
        </nav>
      </div>
      <div className="header__fav--cart--box">

        <div className="header__favorites">
          <NavLink
            to="/favorites"
            className="header__favorites--link"
            activeClassName="header__favorites--link--active"
          >
            <img
              src="../img/icons/Favourites.svg"
              alt="logo"
              className="header__favorites--icon"
            />
          </NavLink>
        </div>

        <div className="header__cart">
          <NavLink
            to="/cart"
            className="header__cart--link"
            activeClassName="header__cart--link--active"
          >
            <img
              src="../img/icons/Cart.svg"
              alt="cart"
              className="header__cart--icon"
            />
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default Header;
