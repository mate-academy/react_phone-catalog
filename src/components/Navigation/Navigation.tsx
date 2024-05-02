import React from 'react';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [styles.navigation__links, isActive ? styles.isActive : ''].join(' ');
};

export const Navigation: React.FC = () => {
  return (
    <section className={styles.navigation}>
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          <li className={styles.navigation__li}>
            <NavLink
              to={{ pathname: '/', search: '' }}
              className={getLinkClass}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink
              to={{ pathname: '/phones', search: '' }}
              className={getLinkClass}
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink
              to={{ pathname: '/tablets', search: '' }}
              className={getLinkClass}
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink
              to={{ pathname: '/accessories', search: '' }}
              className={getLinkClass}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};
