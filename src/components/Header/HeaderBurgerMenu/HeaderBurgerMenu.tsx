import { NavLink } from 'react-router-dom';
import styles from './HeaderBurgerMenu.module.scss';
import { HeaderActions } from '../HeaderActions/HeaderActions';

export const HeaderBurgerMenu = () => {
  return (
    <aside className={`${styles.mobileMenu}`}>
      <nav className={`${styles.mobileNav}`}>
        <ul className={`${styles.mobileNavList} ${styles.nav__list}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
            >
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
            >
              Tablets
            </NavLink>
          </li>

          <li>
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

      <div className={styles.mobileActions}>
        <HeaderActions />
      </div>
    </aside>
  );
};
