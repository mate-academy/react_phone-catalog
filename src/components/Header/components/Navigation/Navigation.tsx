import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import React from 'react';

interface Props {
  onClose?: () => void;
  className?: string;
}

export const Navigation: React.FC<Props> = ({ onClose, className }) => {
  const navLinks = [
    { to: '/', label: 'home' },
    { to: '/phones', label: 'phones' },
    { to: '/tablets', label: 'tablets' },
    { to: '/accessories', label: 'accessories' },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.nav__link, 'uppercase', {
      [styles.nav__link_active]: isActive,
    });
  };

  return (
    <nav className={classNames(styles.nav, className)}>
      <ul className={styles.nav__list}>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={getNavLinkClass} onClick={onClose}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
