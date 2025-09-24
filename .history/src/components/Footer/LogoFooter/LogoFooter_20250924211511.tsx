
import styles from './LogoFooter.module.scss';
import { NavLink } from 'react-router-dom';

export const LogoFooter = () => {
  return (
    <NavLink className={styles.logofooter} to="/" onClick={() => window.scrollTo(0, 0)}>
      <img src="images/Logo.svg" alt="Nice Gadgets Logo" />
    </NavLink>
  );
};
