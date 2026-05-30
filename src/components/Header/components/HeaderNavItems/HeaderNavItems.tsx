import { NavLink } from 'react-router-dom';
import styles from './HeaderNavItems.module.scss';

type Props = {
  className?: string;
  onLinkClick?: () => void;
};

export const HeaderNavItems: React.FC<Props> = ({ className, onLinkClick }) => {
  return (
    <div className={`${styles.navigation} ${className || ''}`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
        onClick={onLinkClick}
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
        onClick={onLinkClick}
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
        onClick={onLinkClick}
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.activeLink : ''}`
        }
        onClick={onLinkClick}
      >
        Accessories
      </NavLink>
    </div>
  );
};
