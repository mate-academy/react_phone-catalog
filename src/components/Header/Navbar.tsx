import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { getClassLink } from '../../utils/getClassLink';

type Props = {
  onMenuClose: (close: boolean) => void;
};

export const Navbar: React.FC<Props> = ({ onMenuClose }) => {
  const getLinkClass = getClassLink({
    baseClass: styles.navbar__navLink,
    activeClass: styles.activeLink,
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarBrand}>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/phones"
          >
            PHONES
          </NavLink>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/tablets"
          >
            TABLETS
          </NavLink>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/accessories"
          >
            ACCESORIES
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
