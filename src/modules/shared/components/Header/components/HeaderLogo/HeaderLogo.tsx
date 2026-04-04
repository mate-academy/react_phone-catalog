import { Link } from 'react-router-dom';

import logoImg from '/img/logo.svg';
import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img
          src={logoImg}
          className={styles.logoImg}
          alt="Nice Gadgets Logo"
        ></img>
      </Link>
    </div>
  );
};
