import { NavLink } from 'react-router-dom';

import { getActiveNavLink, getNavigationRoute } from '../../../utils';

import { NAV_ROUTES } from '../../../constants/constants';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav>
      <ul className={styles.links}>
        {NAV_ROUTES.map(route => (
          <li key={route} className={styles.item}>
            <NavLink
              className={getActiveNavLink}
              to={getNavigationRoute(route)}
            >
              {route}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
