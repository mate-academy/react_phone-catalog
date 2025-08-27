import styles from './nav.module.scss';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../constants/navLink';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import classNames from 'classnames';

export const Nav = () => {
  const { setOpenMenu } = useContext(ProductContext);

  const navActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, {
      [styles['navLink--active']]: isActive,
    });

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map(item => (
          <li key={item.title} className={styles.navItem}>
            <NavLink
              to={item.path}
              className={navActiveLink}
              onClick={() => setOpenMenu(false)}
            >
              {item.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
