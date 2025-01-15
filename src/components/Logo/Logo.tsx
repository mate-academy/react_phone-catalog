import React from 'react';
import styles from './Logo.module.scss';
import logoLight from '../../assets/images/logo.png';

export const Logo = () => {
  return (
    <a href="/" className={styles.logo}>
      <img
        src={logoLight}
        alt="Nice Gadgets logo"
        className={styles.logo__img}
      />
    </a>
  );
};
