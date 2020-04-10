import React from 'react';
import './Header.scss';
import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import favoriteIcon from '../../assets/images/icons/favorite-icon.svg';
import searchIcon from '../../assets/images/icons/search-icon.svg';
import basketIcon from '../../assets/images/icons/basket-icon.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__header-wrapper">
        <nav className="header__nav nav">
          <div className="header__logo">
            <p className="header__logo-heading">Android</p>
            <p className="header__logo-underheading">paranoid</p>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/phones"
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/tablets"
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/accessories"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__menu">
          <label htmlFor="header-search" className="header__search-label">
            <input
              type="search"
              id="header-search"
              className="header__search-input"
              placeholder="Search..."
            />
            <span className="header__search-icon-container">
              <img
                src={searchIcon}
                alt="search icon"
                className="header__search-icon"
              />
            </span>
          </label>
          <button className="header__favorite" type="button">
            <img
              src={favoriteIcon}
              alt="favorite icon"
              className="header__favorite-icon"
            />
            {' '}
          </button>
          <button className="header__basket" type="button">
            <img
              src={basketIcon}
              alt="basket icon"
              className="header__basket-icon"
            />
            {' '}
          </button>
        </div>
      </div>
    </header>
  );
};
