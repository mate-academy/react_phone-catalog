import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

type Props = {
  className?: string;
};

export const Navbar: React.FC<Props> = ({ className }) => {
  const navLinks = [
    { path: '/', label: 'Home', end: true },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      styles.navbar__item,
      { [styles['navbar__item--active']]: isActive },
      className,
    );

  return (
    <>
      {navLinks.map(({ path, label, end }) => (
        <NavLink key={path} to={path} className={getActiveLink} end={end}>
          {label}
        </NavLink>
      ))}
    </>
  );
};
