import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavList = () => {
  return (
    <ul className="header-list">
      <li className="header-list__item">
        <NavLink to="/" exact className="header-list__link">Home</NavLink>
      </li>
      <li className="header-list__item">
        <NavLink
          to={{
            pathname: '/phones',
            search: '?page=1&filter=8&&age=newest',
          }}
          className="header-list__link"
        >
          Phones
        </NavLink>
      </li>
      <li className="header-list__item">
        <NavLink
          to={{
            pathname: '/tablets',
            search: '?page=1&filter=8&&age=newest',
          }}
          className="header-list__link"
        >
          Tablets
        </NavLink>
      </li>
      <li className="header-list__item">
        <NavLink to="/accessories" className="header-list__link">Accessories</NavLink>
      </li>
    </ul>
  );
};
