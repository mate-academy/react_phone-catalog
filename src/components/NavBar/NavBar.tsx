import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './NavBar.scss';

export const NavBar: FC = () => {
  return (
    <nav
      className="header__navbar navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
        <NavLink to="/">
          <img
            src="img/LOGO.svg"
            alt="Logo"
            className="navbar__logo"
          />
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          <p className="nav-link-text">Home</p>
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          <p className="nav-link-text">Phones</p>
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          <p className="nav-link-text">Tablets</p>
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          <p className="nav-link-text">Accessories</p>
        </NavLink>
      </div>
    </nav>
  );
};
