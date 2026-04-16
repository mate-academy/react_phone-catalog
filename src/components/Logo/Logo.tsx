import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

import LogoIcon from '../../img/Logo.svg';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <LogoIcon className={styles.logoIcon} />
    </Link>
  );
};
