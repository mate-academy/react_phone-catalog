import React from 'react';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';
import '../styles/Navigation.scss';

const NAVIGATES = ['home', 'phones', 'tablets', 'accessories'];

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('nav__link', { 'nav__link--active': isActive })
);

export const Navigation: React.FC = () => (
  <nav className="nav">
    <ul className="nav__list">
      {NAVIGATES.map(item => (
        <li key={item} className="nav__item">
          <NavLink
            to={item === 'home' ? '/' : item}
            className={getLinkClass}
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
