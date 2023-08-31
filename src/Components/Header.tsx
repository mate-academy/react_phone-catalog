// import React from 'react'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import '../style/main.scss';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', { 'nav__link--active': isActive },
);

export const Navigation = () => {
  return (
    <nav>
      <div className="nav">
        <div className="nav-buttom">
          <NavLink
            to="/"
            className="nav__link"
          >
            <img src="icons/logo.svg" alt="Logo" />
          </NavLink>

          <NavLink
            to="/"
            className={getActiveLink}

          >
            Home
          </NavLink>

          <NavLink
            to="/Phones"
            className={getActiveLink}

          >
            Phones
          </NavLink>

          <NavLink
            to="/Tablets"
            className={getActiveLink}

          >
            Tablets
          </NavLink>

          <NavLink
            to="/Accessories"
            className={getActiveLink}

          >
            Accessories
          </NavLink>

        </div>
        <div className="nav-buttom">
          <NavLink
            to="/Favourites"
            className={getActiveLink}
          >
            Favourites
          </NavLink>

          <NavLink
            to="/Shopping"
            className={getActiveLink}
          >
            Shopping
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
