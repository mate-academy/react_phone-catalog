import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/logo/logo.svg?react';
import styles from './Logo.styles.module.scss';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <LogoIcon />
    </Link>
  );
};
