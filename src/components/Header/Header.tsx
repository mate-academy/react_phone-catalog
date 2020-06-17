import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import '../../commonStyles/Link.scss';
import SearchInput from '../SearchInput/SearchInput';

type Location = {
  pathname: string;
};

const Header = () => {
  const location: Location = useLocation();
  const { pathname } = location;

  return (
    <header className="header">
      <div className="header__routing-link">
        <div className="header__logo">
          <img
            src="./img/icons/header/LOGO.png"
            alt="logo"
          />
        </div>
        <ul className="header__link-list link__list">
          <li className="link__item">
            <NavLink
              to="/"
              className="link__routing-link"
            >
              Home
            </NavLink>
          </li>
          <li className="link__item">
            <NavLink
              to="/phone"
              className="link__routing-link"
            >
              Phones
            </NavLink>
          </li>
          <li className="link__item">
            <NavLink
              to="/tablet"
              className="link__routing-link"
            >
              Tablets
            </NavLink>
          </li>
          <li className="link__item">
            <NavLink
              to="/accessories"
              className="link__routing-link"
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="header__link-wrapper">
        { (pathname !== '/'
          && pathname !== '/Cart') && (
          <SearchInput />
        )}
        <ul className="header__link-list">
          <li className="header__link-item">
            <NavLink
              to="/favorites"
              className="header__link"
            >
              <img
                src="./img/icons/header/favorites.svg"
                alt="favorites"
              />
            </NavLink>
          </li>
          <li className="header__link-item">
            <NavLink
              to="/Cart"
              className="header__link"
            >
              <img
                src="./img/icons/header/cart.svg"
                alt="cart"
                className="link__content"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
