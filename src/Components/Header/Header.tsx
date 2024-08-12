import { NavLink } from 'react-router-dom';
import { Navbar } from '../NavBar';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src="img/icons/Logo.png" alt="" className="logo-img" />
        </NavLink>
      </div>
      <Navbar />
    </div>
  );
};
