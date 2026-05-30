/* eslint-disable max-len */
import styles from './Logo.module.scss';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink
      className={styles.logo}
      to="/"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img src="images/Logo.svg" alt="Nice Gadgets Logo" />
    </NavLink>
  );
};
