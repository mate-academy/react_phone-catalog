import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import { getActiveClassName } from '../../helpers/utils/getActiveClassName';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/home" className="header__nav-logo" />
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => getActiveClassName(
                'header__nav-link',
                isActive,
              )}
            >
              Home
            </NavLink>
          </li>

          <li className="header__nav-item">
            <NavLink
              to="/phones"
              className={({ isActive }) => getActiveClassName(
                'header__nav-link',
                isActive,
              )}
            >
              Phones
            </NavLink>
          </li>

          <li className="header__nav-item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => getActiveClassName(
                'header__nav-link',
                isActive,
              )}
            >
              Tablets
            </NavLink>
          </li>

          <li className="header__nav-item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => getActiveClassName(
                'header__nav-link',
                isActive,
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header__cart">
        <NavLink
          to="/search"
          className={({ isActive }) => getActiveClassName(
            'header__cart-link',
            isActive,
            ['header__cart-link--search'],
          )}
        />
        <NavLink
          to="/favourites"
          className={({ isActive }) => getActiveClassName(
            'header__cart-link',
            isActive,
            ['header__cart-link--favourites'],
          )}
        />
        <NavLink
          to="/cart"
          className={({ isActive }) => getActiveClassName(
            'header__cart-link',
            isActive,
            ['header__cart-link--cart'],
          )}
        />

      </div>
    </header>
  );
};

export default Header;
