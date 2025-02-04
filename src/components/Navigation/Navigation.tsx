import React from 'react';
import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../constants/navLinks';

type Props = {
  isMenu: boolean;
};

export const Navigation: React.FC<Props> = ({ isMenu }) => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles['is-active'] : '';

  return (
    <nav className={isMenu ? styles.navMenu : styles.nav}>
      <ul className={styles.nav__list}>
        {navLinks.map(link => (
          <li className={styles.nav__item} key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => getActiveClass({ isActive })}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
