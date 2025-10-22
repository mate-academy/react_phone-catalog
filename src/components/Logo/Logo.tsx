import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <NavLink to="/" className={styles['logo-link']}>
        <img
          className={styles.logo__img}
          src="/src/images/Logo-black.svg"
          alt="NAMU logo"
        />
      </NavLink>
    </div>
  );
};
