import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss';

function getNavLinkClassName(isActive: boolean) {
  return `${styles.nav__link} ${
    isActive ? styles['nav__link--is-active'] : ''
  }`;
}

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => getNavLinkClassName(isActive)}
          >
            home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/phones"
            className={({ isActive }) => getNavLinkClassName(isActive)}
          >
            phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/tablets"
            className={({ isActive }) => getNavLinkClassName(isActive)}
          >
            tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/accessories"
            className={({ isActive }) => getNavLinkClassName(isActive)}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
