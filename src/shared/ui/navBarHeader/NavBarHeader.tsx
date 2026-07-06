import { NavLink } from 'react-router-dom';
import styles from './NavBarHeader.module.scss';

export const NavBarHeader = ({ className = '' }) => {
  return (
    <nav className={className}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeNavLink : styles.navLink
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        className={({ isActive }) =>
          isActive ? styles.activeNavLink : styles.navLink
        }
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) =>
          isActive ? styles.activeNavLink : styles.navLink
        }
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          isActive ? styles.activeNavLink : styles.navLink
        }
      >
        Accessories
      </NavLink>
    </nav>
  );
};
