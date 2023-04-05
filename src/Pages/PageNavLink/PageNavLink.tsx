import React from 'react';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import '../Nav/Nav.scss';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('nav__item', { 'nav__item--active': isActive })}
    >
      {text}
    </NavLink>
  );
};
