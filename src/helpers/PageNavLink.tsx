import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'nav__item',
        { selected: isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
