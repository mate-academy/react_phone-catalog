import { NavLink } from 'react-router-dom';
import styles from './HeaderNavigation.module.scss';

export const HeaderNavigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
        </li>

        <li className={styles.nav__item}>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive ? styles.active : ''}`
            }
          >
            Phones
          </NavLink>
        </li>

        <li className={styles.nav__item}>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive ? styles.active : ''}`
            }
          >
            Tablets
          </NavLink>
        </li>

        <li className={styles.nav__item}>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive ? styles.active : ''}`
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
