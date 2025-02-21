import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavBar } from '../Nav/NavBar';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo_container}>
        <Link to="/">
          <img
            className={styles.header__logo}
            src="/react_phone-catalog/img/servic/Logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <NavBar />
    </div>
  );
};
