import React from 'react';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <section className={styles.navigation}>
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          <li className={styles.navigation__li}>
            <NavLink to={'/'} className={styles.navigation__links}>
              Home
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink to={'/phones'} className={styles.navigation__links}>
              Phones
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink to={'/tablets'} className={styles.navigation__links}>
              Tablets
            </NavLink>
          </li>
          <li className={styles.navigation__li}>
            <NavLink to={'/accecories'} className={styles.navigation__links}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};
