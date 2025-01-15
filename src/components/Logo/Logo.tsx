import React from 'react';
import styles from './Logo.module.scss';
import logoLight from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img
        src={logoLight}
        alt="Nice Gadgets logo"
        className={styles.logo__img}
      />
    </Link>
  );
};
