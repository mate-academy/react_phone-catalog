import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  classes: string;
  activeClass: string;
};

export const CustomNavLink: FC<Props> = ({
  children,
  to,
  classes,
  activeClass,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      classes,
      { [activeClass]: isActive },
    )}
  >
    {children}
  </NavLink>
);
