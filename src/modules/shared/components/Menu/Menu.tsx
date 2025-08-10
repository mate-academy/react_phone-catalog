import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import classNames from 'classnames';

export const Menu = () => {
  return (
    <nav className="menu" role="navigation">
      <ul role="list">
        <li>
          {' '}
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__linkActive]: isActive,
              })
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__linkActive]: isActive,
              })
            }
          >
            Phones
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__linkActive]: isActive,
              })
            }
          >
            Tablets
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink
            to="/accesories"
            className={({ isActive }) =>
              classNames(styles.menu__link, {
                [styles.menu__linkActive]: isActive,
              })
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
