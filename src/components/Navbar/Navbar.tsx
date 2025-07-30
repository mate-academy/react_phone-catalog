import { Link, NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <ul className={`${styles.list} ${styles.tablet}`}>
        <li className={`${styles.item} uppercaseText`}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
          >
            home</NavLink>
        </li>
        <li className={`${styles.item} uppercaseText`}>
          <NavLink
            to="/phones"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
          >phones</NavLink>
        </li>
        <li className={`${styles.item} uppercaseText`}>
          <NavLink
            to="/tablets"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
          >tablets</NavLink>
        </li>
        <li className={`${styles.item} uppercaseText`}>
          <NavLink
            to="/accessories"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
          >accessories</NavLink>
        </li>
      </ul>

      <div className={`${styles.icons} ${styles.tablet}`}>
        <div className={`${styles.iconContainer} ${styles.item}`}>
          <Link to={"/favorites"} className={styles.iconHeart}>
          </Link>
        </div>

        <div className={`${styles.iconContainer} ${styles.item}`}>
          <Link to={"/cart"} className={styles.iconMyProducts}>
          </Link>
        </div>
      </div>

      <div className={`${styles.icons} ${styles.phone}`}>
        <div
          className={`${styles.iconContainer} ${styles.item}`}
        >
          <Link to={"/menu"} className={styles.iconBurgerMenu}>
          </Link>
        </div>
      </div>
    </nav>
  );
}