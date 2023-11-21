import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navigation__link', { activeLink: isActive });
};

export const Nav: React.FC = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={getLinkClass}
          >
            home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/phones" className={getLinkClass}>Phones</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/tablets" className={getLinkClass}>tablets</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/accessories"
            className={getLinkClass}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
