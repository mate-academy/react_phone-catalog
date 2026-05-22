import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import classNames from 'classnames';

type Nav = {
  getLinkClass: (args: { isActive: boolean }) => string;
  types: 'asideMenu' | 'header';
};
export const NavBar = ({ getLinkClass, types }: Nav) => {
  return (
    <>
      <nav
        className={classNames(styles.nav, {
          [styles['nav--active']]: types === 'asideMenu',
        })}
      >
        <ul
          className={classNames(styles.nav__list, {
            [styles['nav__list--aside']]: types === 'asideMenu',
          })}
        >
          <li className={styles.nav__item}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li
            className={classNames(styles.nav__item, {
              [styles['nav__item--aside']]: types === 'asideMenu',
            })}
          >
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
          </li>
          <li
            className={classNames(styles.nav__item, {
              [styles['nav__item--aside']]: types === 'asideMenu',
            })}
          >
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
          </li>
          <li
            className={classNames(styles.nav__item, {
              [styles['nav__item--aside']]: types === 'asideMenu',
            })}
          >
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
