import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Navbar.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('Navbar__link', { 'Navbar__link--active': isActive });

const links = [
  ['/', 'Home'],
  ['/phones', 'Phones'],
  ['/tablets', 'Tablets'],
  ['/accessories', 'Accessories'],
];

export const Navbar: React.FC = memo(() => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        {links.map(([link, name]) => (
          <li key={link} className="Navbar__item">
            <NavLink to={link} className={getLinkClass}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});
