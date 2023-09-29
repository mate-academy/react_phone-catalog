import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Logo />

        <NavLink
          to="/"
          className={`navbar__item ${location.pathname === '/'
            ? 'navbar__item' : ''}`}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={`navbar__item ${location.pathname === '/phones'
            ? 'navbar__item' : ''}`}
        >
          phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={`navbar__item ${location.pathname === '/tablets'
            ? 'navbar__item' : ''}`}
        >
          tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={`navbar__item ${location.pathname === '/accessories'
            ? 'navbar__item' : ''}`}
        >
          accessories
        </NavLink>
      </ul>

      <div className="navbar__icons">
        <Link
          to="/"
          className="navbar__icon"
        >
          <div className="navbar__icon--favourite" />
        </Link>

        <Link
          to="/"
          className="navbar__icon"
        >
          <div className="navbar__icon--cart" />
        </Link>
      </div>
    </nav>
  );
};
