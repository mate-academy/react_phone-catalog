import React from 'react';
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface NavigationProps {
  direction?: 'row' | 'column';
  menu?: 'visible' | 'hidden';
  onCloseMenu?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  direction = 'row',
  menu = 'hidden',
  onCloseMenu,
}) => {
  return (
    <nav className={`${styles.navigation} ${styles[`navigation--${menu}`]}`}>
      <ul
        className={`${styles.navigation__list} ${styles[`navigation__list--${direction}`]} `}
      >
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--column']]: direction === 'column',
          })}
          onClick={onCloseMenu}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
          >
            home
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--column']]: direction === 'column',
          })}
          onClick={onCloseMenu}
        >
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
          >
            phones
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--column']]: direction === 'column',
          })}
          onClick={onCloseMenu}
        >
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link} ${styles['navigation__link--active']}`
                : ` ${styles.navigation__link} `
            }
          >
            tablets
          </NavLink>
        </li>
        <li
          className={classNames(styles.navigation__item, {
            [styles['navigation__item--column']]: direction === 'column',
          })}
          onClick={onCloseMenu}
        >
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${styles.navigation__link} ${styles['navigation__link--active']}`
                : styles.navigation__link
            }
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
