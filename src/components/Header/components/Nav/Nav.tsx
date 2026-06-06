import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

type Props = {
  className?: string;
  onClose?: () => void;
};

export const Nav = ({ className, onClose }: Props) => {
  return (
    <nav className={`${styles.nav} ${className || ''}`}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onClick={onClose}
      >
        Home
      </NavLink>
      <NavLink
        to="/phones"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onClick={onClose}
      >
        Phones
      </NavLink>
      <NavLink
        to="/tablets"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onClick={onClose}
      >
        Tablets
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onClick={onClose}
      >
        Accessories
      </NavLink>
    </nav>
  );
};
