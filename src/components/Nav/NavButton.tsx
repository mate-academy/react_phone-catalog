import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Nav.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('NavButton', {
    'NavButton--selected': isActive,
  }));

type Props = {
  name: string;
  path: string;
};

export const NavButton: React.FC<Props> = ({
  name,
  path,
}) => (
  <NavLink to={{ pathname: path }} className={getLinkClass}>
    {name}
  </NavLink>
);
