import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import classNames from 'classnames';

export const Navigation = () => {
  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigation__link, {
      [styles.navigation__link_active]: isActive,
    });

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink className={activeLink} to="/">
            Home
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink className={activeLink} to="/phones">
            Phones
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink className={activeLink} to="/tablets">
            Tablets
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink className={activeLink} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
