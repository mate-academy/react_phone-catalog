import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { HEADER_NAVIGATION_LINKS } from '../../utils/constants';

export const Navigation: React.FC = () => {
  const links = useMemo(() => HEADER_NAVIGATION_LINKS, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {links.map(({ to, label }) => (
          <li key={to} className={styles.nav__item}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
