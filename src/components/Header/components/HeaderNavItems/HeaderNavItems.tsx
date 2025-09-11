import { NavLink } from 'react-router-dom';
import styles from './HeaderNavItems.module.scss';

type Props = {
  className?: string;
};

export const HeaderNavItems: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${styles.navigation} ${className || ''}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
      >
        Accessories
      </NavLink>
    </div>
  );
};
