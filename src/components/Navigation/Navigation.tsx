import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink
      className={`${styles.nav__item} ${styles.nav__item_active}`}
      to="/"
      end
    >
      Home
    </NavLink>
    <NavLink className={styles.nav__item} to="/phones">
      Phones
    </NavLink>
    <NavLink className={styles.nav__item} to="/tablets">
      Tablets
    </NavLink>
    <NavLink className={styles.nav__item} to="/accessories">
      Accessories
    </NavLink>
  </nav>
);

export default Navigation;
