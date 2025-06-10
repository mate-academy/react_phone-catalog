import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Navigation from '../../components/Navigation';

export const Header = () => (
  <header className={styles.header}>
    <NavLink className={styles.header__logo} to="/">
      <img className={styles.header__image} src="img/assets/logo.svg"></img>
    </NavLink>
    <Navigation />
    <div className={styles.header__buttons}></div>
  </header>
);

export default Header;
