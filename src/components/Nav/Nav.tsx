import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

export const Nav = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <NavLink to="home" className={styles.nav_link}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="phones" className={styles.nav_link}>
            Phones
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="tablets" className={styles.nav_link}>
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="accessories" className={styles.nav_link}>
            Accessories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
