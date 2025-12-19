import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo: FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="img/Logo.png" alt="logo" />
    </Link>
  );
};
