import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from '../Search';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="logo">
          <img src="img/main-logo/logo.svg" alt="" />
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/phones"
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/tablets"
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/accessories"
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__right">
        <Search />
        <NavLink
          to="/favorites"
          className={
            ({ isActive }) => classNames(
              'header__button',
              'header__button--favorites',
              { 'header__button--active': isActive },
            )
          }
        />
        <NavLink
          to="/cart"
          className={
            ({ isActive }) => classNames(
              'header__button',
              'header__button--cart',
              { 'header__button--active': isActive },
            )
          }
        />
      </div>
    </header>
  );
};
