import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { Theme } from '../../types/Theme';
import { ThemeContext } from '../../store/ThemeContex';

type Props = {
  className?: string;
};

export const Navbar: React.FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);

  const navLinks = [
    { path: '/', label: 'Home', end: true },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      {
        [styles.navbar__item]: theme === Theme.Light,
        [styles['navbar__item--active']]: theme === Theme.Light && isActive,
        [styles['navbar__item-dark']]: theme === Theme.Dark,
        [styles['navbar__item-dark--active']]: theme === Theme.Dark && isActive,
      },
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
