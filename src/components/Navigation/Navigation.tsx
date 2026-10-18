import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Navigation = () => (
  <nav className={styles.navigation}>
    <ul className={styles.navigation__list}>
      {LINKS.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              classNames(styles.navigation__link, {
                [styles['navigation__link--active']]: isActive,
              })
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
