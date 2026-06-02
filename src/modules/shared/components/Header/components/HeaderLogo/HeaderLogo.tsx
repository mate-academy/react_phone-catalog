import { Link } from 'react-router-dom';

import logoIcon from '@/assets/svg/logo.svg';
import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img
          src={logoIcon}
          className={styles.logoImg}
          alt="Nice Gadgets Logo"
        ></img>
      </Link>
    </div>
  );
};
