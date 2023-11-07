import React from 'react';
import cn from 'classnames';
import { NavLink, NavLinkProps } from 'react-router-dom';

import '../styles/blocks/NavLinkHeader.scss';

type Props = NavLinkProps & {
  type: 'text' | 'icon';
};

export const NavLinkHeader: React.FC<Props> = ({
  type,
  children,
  ...props
}) => {
  return (
    <NavLink
      className={({ isActive }) => cn(
        'navLinkHeader',
        { [`navLinkHeader--${type}`]: type },
        { isActive },
      )}
      {...props}
    >
      {children}
    </NavLink>
  );
};
