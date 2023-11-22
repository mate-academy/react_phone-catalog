import React from 'react';
import cn from 'classnames';
import { NavLink, NavLinkProps } from 'react-router-dom';
import './NavLink.scss';

type Props = NavLinkProps & {
  type: 'text' | 'cart' | 'favourite';
};

export const NavLinkMain: React.FC<Props> = ({
  type,
  children,
  ...props
}) => {
  return (
    <NavLink
      className={({ isActive }) => cn(
        'NavLinkMain',
        { 'is-active': isActive },
        { [`NavLinkMain--${type}`]: type },
      )}
      {...props}
    >
      {children}
    </NavLink>
  );
};
