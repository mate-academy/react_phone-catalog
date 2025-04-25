import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img
        className={styles.logo__img}
        src="public/img/Logogadgets.svg"
        alt="Nice Gadgets company logo"
      />
    </Link>
  );
};

export default Logo;
