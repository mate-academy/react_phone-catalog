import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Nav.scss';

type Props = {
  name: string;
  path: string;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('NavButton', {
    'NavButton--selected': isActive,
  });

export const NavButton: React.FC<Props> = ({ name, path }) => (
  <NavLink to={{ pathname: path }} className={getLinkClass}>
    {name}
  </NavLink>
);
