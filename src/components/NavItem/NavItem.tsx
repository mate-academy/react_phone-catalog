import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.scss';
import cn from 'classnames';
import { NavItemVariants } from '../../types/Types';

type Props = {
  to: string;
  children: React.ReactNode;
  variant: NavItemVariants;
};

export const NavItem: React.FC<Props> = ({ to, children, variant }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          styles.navLink,
          isActive && styles.active,
          variant === NavItemVariants.navlist && styles.listNavLink,
          variant === NavItemVariants.navicons && styles.iconNavLink,
          variant === NavItemVariants.burger && styles.iconBurgerLink,
        )
      }
    >
      {children}
    </NavLink>
  );
};
