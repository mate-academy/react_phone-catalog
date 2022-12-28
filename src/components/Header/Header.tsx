import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </li>
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
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
