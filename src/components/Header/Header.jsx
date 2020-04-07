import React from 'react';
import './Header.scss';
import './Navigation.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__header-wrapper">
        <nav className="header__nav nav">
          <div className="header__logo">
            <p className="header__logo-heading">Apple</p>
            <p className="header__logo-underheading">drocher</p>
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
            <span className="header__search-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.66683 6.33334C1.66683 3.75601 3.75617 1.66668 6.3335 1.66668C8.91083 1.66668 11.0002 3.75601 11.0002 6.33334C11.0002 7.59061 10.503 8.73176 9.69447 9.57088C9.67163 9.58845 9.64966 9.60769 9.62873 9.62861C9.60781 9.64953 9.58857 9.6715 9.57101 9.69435C8.73189 10.5028 7.59075 11 6.3335 11C3.75617 11 1.66683 8.91067 1.66683 6.33334ZM10.0786 11.0213C9.05216 11.8424 7.75016 12.3333 6.3335 12.3333C3.01979 12.3333 0.333496 9.64705 0.333496 6.33334C0.333496 3.01963 3.01979 0.333344 6.3335 0.333344C9.64721 0.333344 12.3335 3.01963 12.3335 6.33334C12.3335 7.75003 11.8425 9.05203 11.0214 10.0785L13.4715 12.5286C13.7319 12.789 13.7319 13.2111 13.4715 13.4714C13.2112 13.7318 12.7891 13.7318 12.5287 13.4714L10.0786 11.0213Z" fill="#333333" />
              </svg>
            </span>
          </label>
          <NavLink className="header__favorite" to="/"> favorite </NavLink>
          <NavLink className="heder__basket" to="/">basket</NavLink>
        </div>
      </div>
    </header>
  );
};
