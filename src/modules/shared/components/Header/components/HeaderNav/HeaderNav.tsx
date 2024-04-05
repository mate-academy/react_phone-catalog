import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderNav.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navbarLink, {
    [styles.linkActive]: isActive,
  });

export const HeaderNav = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/phones" className={getLinkClass}>
        Phones
      </NavLink>

      <NavLink to="/tablets" className={getLinkClass}>
        Tablets
      </NavLink>

      <NavLink to="/accessories" className={getLinkClass}>
        Accesories
      </NavLink>
    </nav>
  );
};
