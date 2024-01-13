/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

type Props = {
  links: string[];
  small?: boolean;
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

export const NavBar: React.FC<Props> = ({ links, small }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 599 });
  const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
    classNames('navBar__link', {
      'navBar__link--small': small && isSmallScreen,
      'is-active': isActive,
    }));

  return (
    <nav className="navBar">
      <ul className={classNames('navBar__list', {
        'navBar__list--small': isSmallScreen,
      })}
      >
        {links.map(link => (
          <NavLink
            key={link}
            to={getPath(link)}
            className={getLinkNavClass}
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          >
            {link}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
