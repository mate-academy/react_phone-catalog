import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navBar__link', {
    'is-active': isActive,
  }));

  type Props = {
    links: string[];
  };

export const NavBar: React.FC<Props> = ({ links }) => {
  return (
    <nav className="navBar">
      <ul className="navBar__list">
        {links.map(link => (
          <li key={link} className="navBar__item">
            <NavLink
              to={link === 'home' ? '/' : link}
              className={getLinkNavClass}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
