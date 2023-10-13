import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './PageNavLink.scss';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => cn('page-nav-link', {
        'page-nav-link--active': isActive,
      })}
      to={to}
    >
      {text}
    </NavLink>
  );
};
