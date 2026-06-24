import React from 'react';
import styles from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import { Theme } from '../../../public/api/types/theme';

type Props = {
  onClose: () => void;
  theme?: string;
};

export const Nav: React.FC<Props> = ({ onClose, theme }) => {
  return (
    <nav
      className={[
        styles.nav,
        theme === Theme.LIGHT || theme === 'light' ? styles['nav--light'] : '',
      ].join(' ')}
    >
      <ul className={styles.nav__list}>
        {[
          { to: '/', label: 'Home', end: true },
          { to: '/phones', label: 'Phones' },
          { to: '/tablets', label: 'Tablets' },
          { to: '/accessories', label: 'Accessories' },
        ].map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={onClose}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
