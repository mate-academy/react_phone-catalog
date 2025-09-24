import styles from './Logo.module.scss';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <NavLink className={styles.logo} to="/" onClick={()}>
      <img src="images/Logo.svg" alt="Nice Gadgets Logo" />
    </NavLink>
  );
};
