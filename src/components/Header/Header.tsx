import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

import menuIcon from '../../imgs/svg/menu-icon.svg';
import logo from '../../imgs/svg/Logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img className={styles.header__logoImg} src={logo} alt="logo" />
      </div>
      <NavLink to="/menu" className={styles.header__menu}>
        <img
          className={styles.header__logoImg}
          src={menuIcon}
          alt="menu-icon"
        />
      </NavLink>
    </header>
  );
};
