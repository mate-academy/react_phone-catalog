
import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, { [styles.active]: isActive });

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={getLinkClass}>
        <span>HOME</span>
      </NavLink>
      <NavLink to="/phones" className={getLinkClass}>
        <span>PHONES</span>
      </NavLink>
      <NavLink to="/tablets" className={getLinkClass}>
        <span>TABLETS</span>
      </NavLink>
      <NavLink to="/accessories" className={getLinkClass}>
        <span>ACCESSORIES</span>
      </NavLink>
    </nav>
  );
};
