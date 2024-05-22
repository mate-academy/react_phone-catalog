import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../../utils/utils';
import { NavBarLinks } from '../../types/NavbarLinks';
import React from 'react';
import './Navigation.scss';

type Props = {
  className?: string;
  handleClick?: () => void;
};

export const Navigation: React.FC<Props> = ({ className, handleClick }) => {
  return (
    <nav className={className ? `nav ${className}` : 'nav'}>
      <ul className="nav__list">
        {Object.entries(NavBarLinks).map(([key, value]) => (
          <li className="nav__item" key={key}>
            <NavLink to={value} className={getLinkClass} onClick={handleClick}>
              {key}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
