import { Link } from 'react-router-dom';
import logo from './../../../images/header/logo.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.header__logo}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};
