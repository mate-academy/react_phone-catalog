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

const getPath = (link: string) => {
  if (link === 'home') {
    return './';
  }

  if (link === 'returns & refunds') {
    return '/returns';
  }

  return link;
};

export const NavBar: React.FC<Props> = ({ links }) => {
  return (
    <nav className="navBar">
      <ul className="navBar__list">
        {links.map(link => (
          <NavLink
            key={link}
            to={getPath(link)}
            className={getLinkNavClass}
          >
            {link}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
