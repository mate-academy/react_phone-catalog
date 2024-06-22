import { NavLink } from 'react-router-dom';

import { getActiveNavLink } from '../../utils';

import styles from './HeaderLinks.module.scss';

export const HeaderLinks = () => {
  return (
    <ul className={styles.Links}>
      <li className={styles.Item}>
        <NavLink className={getActiveNavLink} to="/">
          Home
        </NavLink>
      </li>
      <li className={styles.Item}>
        <NavLink className={getActiveNavLink} to="/phones">
          Phones
        </NavLink>
      </li>
      <li className={styles.Item}>
        <NavLink className={getActiveNavLink} to="/tablets">
          Tablets
        </NavLink>
      </li>
      <li className={styles.Item}>
        <NavLink className={getActiveNavLink} to="/accessories">
          accessories
        </NavLink>
      </li>
    </ul>
  );
};
