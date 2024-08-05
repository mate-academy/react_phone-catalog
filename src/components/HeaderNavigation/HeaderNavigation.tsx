import { NavLink } from 'react-router-dom';

import { getActiveNavLink, getNavigationRoute } from '../../utils';

import { NAV_ROUTES } from '../../constants/constants';
import styles from './HeaderNavigation.module.scss';

export const HeaderNavigation = () => {
  return (
    <nav>
      <ul className={styles.Links}>
        {NAV_ROUTES.map(route => (
          <li key={route} className={styles.Item}>
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
