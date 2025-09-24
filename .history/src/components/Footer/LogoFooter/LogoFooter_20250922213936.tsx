import React from 'react';
import styles from './LogoFooter.module.scss';
import { NavLink } from 'react-router-dom';

export const LogoFooter = () => {
  return (
    <NavLink className={styles.logofooter} to="/">
      <img src="images/Logo.png" alt="Nice Gadgets Logo" />
    </NavLink>
  );
};
