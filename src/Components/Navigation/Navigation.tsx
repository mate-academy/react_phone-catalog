import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

export const Navigation:React.FC = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) => classNames('navigation__link', {
              'navigation__link--active': isActive,
            })}
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/phones"
            className={({ isActive }) => classNames('navigation__link', {
              'navigation__link--active': isActive,
            })}
          >
            Phones
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) => classNames('navigation__link', {
              'navigation__link--active': isActive,
            })}
          >
            Tablets
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) => classNames('navigation__link', {
              'navigation__link--active': isActive,
            })}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
