import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import { NAV_LINKS } from './constants';
import classNames from 'classnames';

const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles['nav-menu__link'], {
    [styles['nav-menu__link--active']]: isActive,
  });
};

export const NavMenu = () => {
  return (
    <ul className={styles['nav-menu__list']}>
      {NAV_LINKS.map(link => (
        <li className={styles['nav-menu__item']} key={link.label}>
          <NavLink to={link.path} className={handleActiveLink}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
