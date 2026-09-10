import classNames from 'classnames';
import styles from './Nav.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  variant?: 'row' | 'column';
}

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.navLink, {
    [styles.isActive]: isActive,
  });
};

const LINKS_CONFIG = [
  { label: 'Home', path: '/' },
  { label: 'Phones', path: '/phones' },
  { label: 'Tablets', path: '/tablets' },
  { label: 'Accessories', path: '/accessories' },
];

export const Nav = ({ variant = 'column' }: Props) => {
  return (
    <nav className={classNames(styles.nav, styles[variant])}>
      <ul className={classNames(styles.navList, styles[variant])}>
        {LINKS_CONFIG.map(link => (
          <li key={link.path} className={styles.navItem}>
            <NavLink to={link.path} className={getLinkClass}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
