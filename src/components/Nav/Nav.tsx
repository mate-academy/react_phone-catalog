import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Nav.module.scss';

export const Nav = () => {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.link, isActive ? styles.active : '')
          }
        >
          Home
        </NavLink>
      </li>

      <li className={styles.item}>
        <NavLink
          to="/phones"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.link, isActive ? styles.active : '')
          }
        >
          Phones
        </NavLink>
      </li>

      <li className={styles.item}>
        <NavLink
          to="/tablets"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.link, isActive ? styles.active : '')
          }
        >
          Tablets
        </NavLink>
      </li>

      <li className={styles.item}>
        <NavLink
          to="/accessories"
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.link, isActive ? styles.active : '')
          }
        >
          Accessories
        </NavLink>
      </li>
    </ul>
  );
};
