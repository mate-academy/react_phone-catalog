import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const NAVIGATION: string[] = ['home', 'phones', 'tablets', 'accessories'];

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {NAVIGATION.map(link => (
          <li key={link} className={styles.navigation__item}>
            <NavLink
              to={link === 'home' ? '/' : `/${link}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navigation__link} ${styles['navigation__link--active']}`
                  : styles.navigation__link
              }
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
