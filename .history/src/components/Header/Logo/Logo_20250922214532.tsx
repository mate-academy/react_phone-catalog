import React from 'react';
import styles from './Logo.module.scss';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink className={styles.logo} to="/">
      <img src="images/Logo.png" alt="Nice Gadgets Logo" />
    </NavLink>
  );
};
