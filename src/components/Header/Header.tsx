import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left-side-container">
        <div
          className="header__logo logo"
        >
          <NavLink
            to="../"
            className="logo__title"
          />
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
              })}
              to="/"
              end
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
              })}
              to="/phones"
            >
              Phones
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
              })}
              to="/tablets"
            >
              Tablets
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
              })}
              to="/accessories"
            >
              Accessories
            </NavLink>
          </ul>
        </nav>
      </div>

      <div className="header__right-side-container">
        <NavLink
          to="/favourities"
          className={({ isActive }) => classNames(
            'header__favourites favourites', {
              'nav__item--is-active': isActive,
            },
          )}
        />

        <NavLink
          to="/bag"
          className={({ isActive }) => classNames(
            'header__bag bag', {
              'nav__item--is-active': isActive,
            },
          )}
        />
      </div>
    </header>
  );
};
