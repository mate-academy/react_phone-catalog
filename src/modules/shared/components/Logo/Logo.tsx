import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <NavLink to="/" className={styles.logo}>
    <img
      className={styles.logo__image}
      src="/images/Logo.png"
      alt="NiceGadgets"
    />
  </NavLink>
);
