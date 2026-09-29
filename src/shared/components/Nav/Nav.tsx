import React from 'react';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';
import './Nav.scss';

interface Options {
  isActive: boolean;
}

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className }) => {
  const isActiveClass = ({ isActive }: Options) =>
    cn('nav-site__link', { 'is-active': isActive });

  return (
    <nav
      className={cn('nav-site', className)}
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="nav-site__list">
        <li className="nav-site__item">
          <NavLink to="/" className={isActiveClass}>
            Home
          </NavLink>
        </li>
        <li className="nav-site__item">
          <NavLink to="/phones" className={isActiveClass}>
            Phones
          </NavLink>
        </li>
        <li className="nav-site__item">
          <NavLink to="/tablets" className={isActiveClass}>
            Tablets
          </NavLink>
        </li>
        <li className="nav-site__item">
          <NavLink to="/accessories" className={isActiveClass}>
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
