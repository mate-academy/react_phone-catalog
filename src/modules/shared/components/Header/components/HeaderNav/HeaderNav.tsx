import { NavLink } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

const getLinkClass = (isActive: boolean) => {
  return isActive ? styles.activeLink : styles.link;
};

export const HeaderNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={({ isActive }) => getLinkClass(isActive)}>
        HOME
      </NavLink>
      <NavLink
        to="/phones"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        PHONES
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        TABLETS
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        ACCESSORIES
      </NavLink>
    </nav>
  );
};
