import styles from './MenuNav.module.scss';
import { NavLink } from 'react-router-dom';

type MenuNavProps = {
  className?: string;
  handleMenuClick?: () => void;
};

export const MenuNav: React.FC<MenuNavProps> = ({
  className,
  handleMenuClick,
}) => {
  return (
    <div className={`${styles.menu}`}>
      <nav
        className={`${styles.nav} ${styles.menu__nav} ${className ? className : ''}`}
      >
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={handleMenuClick}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={handleMenuClick}
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={handleMenuClick}
            >
              tablets
            </NavLink>
          </li>

          <li className={styles.nav__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={handleMenuClick}
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
