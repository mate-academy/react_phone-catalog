import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../../utils/utils';
import { NavBarLinks } from '../../types/NavbarLinks';
import React from 'react';
import './Navigation.scss';

type Props = {
  className?: string;
};

export const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <nav className={`nav ${className}`}>
      <ul className="nav__list">
        {Object.entries(NavBarLinks).map(([key, value]) => (
          <li className="nav__item" key={key}>
            <NavLink to={value} className={getLinkClass}>
              {key}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
