import React from 'react';
import classNames from 'classnames';
import { NavLinkProps, NavLink } from 'react-router-dom';

import styles from './NavLinkItem.module.scss';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['nav-link-item'], {
    [styles['nav-link-item--active']]: isActive,
  });

export const NavLinkItem: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <NavLink {...props} className={getLinkClass}>
    {children}
  </NavLink>
);
