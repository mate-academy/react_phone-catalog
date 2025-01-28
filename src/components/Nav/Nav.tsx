import { NavLink } from 'react-router-dom';
import { getActiveLink } from '../../utils/getActiveLink';
import styles from './Nav.module.scss';

export const Nav = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
