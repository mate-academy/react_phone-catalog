import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ title, link, exact }: NavItemProps) => {
  return (
    <li className="nav__item">
      <NavLink
        to={link}
        exact={exact}
        className="nav__link"
        activeClassName="nav__link--active"
      >
        {title}
      </NavLink>
    </li>
  );
};
