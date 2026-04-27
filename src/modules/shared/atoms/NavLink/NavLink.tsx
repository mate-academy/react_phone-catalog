import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
  NavLinkRenderProps,
} from 'react-router-dom';
import styles from './NavLink.module.scss';
import React from 'react';
import classNames from 'classnames';
import { Typography } from '../Typography';

export type NavLinkProps = Omit<
  RouterNavLinkProps,
  'className' | 'children'
> & {
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  rel?: string;
  target?: string;
  to: string;
};

const getNavLinkClass = (isActive: boolean, className?: string): string =>
  classNames(
    styles.navlink,
    {
      [styles['navlink--active']]: isActive,
    },
    className,
  );

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  external = false,
  target,
  rel,
  className,
  children,
}) => {
  const content = (isActive: boolean) => (
    <Typography
      variant="uppercase"
      className={styles.navlink__text}
      color={isActive ? 'primary' : 'secondary'}
    >
      {children}
    </Typography>
  );

  if (external) {
    return (
      <a
        href={to}
        target={target}
        rel={rel}
        className={getNavLinkClass(false, className)}
      >
        {content(false)}
      </a>
    );
  }

  return (
    <RouterNavLink
      to={to}
      className={({ isActive }: NavLinkRenderProps) =>
        getNavLinkClass(isActive, className)
      }
      children={({ isActive }) => content(isActive)}
    />
  );
};
