import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO } from '../../constants/logo';
import styles from './HeaderNavBar.module.scss';

export const HeaderNavBar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <nav className={styles.headerNav} aria-label="Header navigation">
    <Link to="/" className={styles.headerLogo}>
      <img
        src={LOGO.img}
        className={styles.headerImg}
        alt="Nice Gadgets home"
      />
    </Link>

    {children}
  </nav>
);
