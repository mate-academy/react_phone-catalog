import React from 'react';
import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <img className={styles.logo__img} src="/img/Logo.svg" alt="Logo" />
      </div>

      <div className={styles.links}>
        <NavLink className={styles.links__item} to={'/'}>
          HOME
        </NavLink>
        <NavLink className={styles.links__item} to={'/'}>
          PHONES
        </NavLink>
        <NavLink className={styles.links__item} to={'/'}>
          TABLETS
        </NavLink>
        <NavLink className={styles.links__item} to={'/'}>
          ACCESSORIES
        </NavLink>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <NavLink to="/favourites" className={styles.links__item}>
            <img src="/img/favourites.svg" alt="favourites" />
          </NavLink>
        </div>
        <div className={styles.icon}>
          <NavLink to="/case" className={styles.links__item}>
            <img src="/img/case.svg" alt="case" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
