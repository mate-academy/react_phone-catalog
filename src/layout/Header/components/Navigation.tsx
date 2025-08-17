import { NavLink } from 'react-router-dom';
import styles from '../Header.module.scss';

type Props = {
  onClose?: () => void;
};

export const Navigation: React.FC<Props> = ({ onClose }) => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        onClick={onClose}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        onClick={onClose}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        onClick={onClose}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        onClick={onClose}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Accessories
      </NavLink>
    </nav>
  );
};
