import React from 'react';
import styles from './NavBarFooter.module.scss';
import { NavLink } from 'react-router-dom';

export const NavBarFooter = () => {
  return (
    <nav className={styles.navbarfooter}>
      <NavLink to="/github" className={styles.link}>
        <span>GITHUB</span>
      </NavLink>
      <NavLink to="/contacts" className={styles.link}>
        <span>CONTACTS</span>
      </NavLink>
      <NavLink to="/rights" className={styles.link}>
        <span>RIGHTS</span>
      </NavLink>
    </nav>
  );
};
