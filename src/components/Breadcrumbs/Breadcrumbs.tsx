import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import iconStyles from '../Icon/Icon.module.scss';

export const Breadcrumbs = ({ categoryName, productName }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.nav} ${styles.breadcrumbs}`}
    >
      <div className={styles.iconsRow}>
        <NavLink
          to="/"
          className={`${iconStyles.icon} ${styles.icon} ${iconStyles['icon--home']}`}
        ></NavLink>

        <span
          className={`${iconStyles.icon}  ${styles.icon} ${iconStyles['icon--button-right']}`}
        ></span>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.nav__link} ${isActive ? styles.active : ''}`
          }
        >
          {categoryName}
        </NavLink>

        <>
          <span
            className={`${iconStyles.icon} ${styles.icon} ${iconStyles['icon--button-right']}`}
          ></span>
          <span className={styles.current}>{productName}</span>
        </>
      </div>
    </nav>
  );
};
