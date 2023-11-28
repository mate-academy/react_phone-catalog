import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './NavBar.scss';

export const NavBar: FC = () => {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
        <NavLink to="/">
          <img
            src="img/LOGO.svg"
            alt="Logo"
            className="header__logo"
          />
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
        >
          Accessories
        </NavLink>
      </div>
    </nav>
  );
};
