import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { navigation } from '../../utils/navigation';

import './Nav.scss';

export const Nav: FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navigation.map(({ name, to }) => (
          <li
            key={name}
            className="nav_item"
          >
            <NavLink
              className={({ isActive }) => classNames('nav__link', {
                'nav__link--active': isActive,
              })}
              to={to}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
