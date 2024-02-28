import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { HeaderLinks } from '../../../types/HeaderLinks';

type Props = HeaderLinks;

export const HeaderLink: React.FC<Props> = ({ to, className, children }) => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return clsx(className, isActive && 'link-header--active');
  };

  return (
    <NavLink to={to} className={isActiveLink}>
      {children}
    </NavLink>
  );
};
