import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
};

export const NavItem: React.FC<Props> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `navbar__item ${isActive ? 'navbar__item--active' : ''}`
      }
    >
      <span className="navbar__label text-uppercase">{children}</span>
    </NavLink>
  );
};
