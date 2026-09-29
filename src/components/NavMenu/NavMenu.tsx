import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from '../../utils/classNames';
import './NavMenu.scss';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

interface Props {
  variant?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
}

export const NavMenu: React.FC<Props> = ({
  variant = 'horizontal',
  onLinkClick,
}) => {
  return (
    <nav className={classNames('nav-menu', `nav-menu--${variant}`)}>
      <ul className="nav-menu__list">
        {links.map(link => (
          <li key={link.to} className="nav-menu__item">
            <NavLink
              to={link.to}
              end={link.end}
              onClick={onLinkClick}
              className={({ isActive }) =>
                classNames('nav-menu__link', {
                  'nav-menu__link--active': isActive,
                })
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
