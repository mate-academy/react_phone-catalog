import React from 'react';
import styles from './nav.module.scss';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../constants/navLink';

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map(item => (
          <li key={item.title} className={styles.navItem}>
            <NavLink to={item.path} className={styles.navLink}>
              {item.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
