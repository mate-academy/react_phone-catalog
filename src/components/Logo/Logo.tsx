import React from 'react';
import styles from './Logo.module.scss';
import logoLight from '../../assets/images/logo.png';
import logoDark from '../../assets/images/logo-dark.png';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export const Logo = () => {
  const { theme } = useTheme();

  const logo = theme === 'dark' ? logoDark : logoLight;

  return (
    <Link to="/" className={styles.logo}>
      <img src={logo} alt="Nice Gadgets logo" className={styles.logo__img} />
    </Link>
  );
};
