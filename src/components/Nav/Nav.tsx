import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('menu__link', {
    active: isActive,
  });

const Nav: React.FC = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <NavLink to="/" className={getLinkClass}>
            home
          </NavLink>
        </li>

        <li className="menu__item">
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
        </li>

        <li className="menu__item">
          <NavLink to="/tablets" className={getLinkClass}>
            tablets
          </NavLink>
        </li>

        <li className="menu__item">
          <NavLink to="/accessories" className={getLinkClass}>
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
