import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ path, text }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => classNames('nav__link', {
        'nav__link--active': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};
