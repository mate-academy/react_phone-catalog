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
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames(
            'navbar__item',
            { 'has-background-grey-lighter': isActive },
            { 'nav-link-active': isActive },
          )}
        >
          Accessories
        </NavLink>
      </div>
    </nav>
  );
};
