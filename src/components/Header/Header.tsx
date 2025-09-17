import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img
            className={styles.logo_img}
            src="/logo/img.png"
            alt="Nice Gadgets logo"
          />
        </NavLink>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <NavLink to="/favorites" className={styles.iconBox}>
          <img className={styles.icon} src="/icons/heard.svg" alt="Favorites" />
        </NavLink>

        <NavLink to="/cart" className={styles.iconBox}>
          <img className={styles.icon} src="/icons/basket.svg" alt="Cart" />
        </NavLink>
      </div>
    </header>
  );
};
