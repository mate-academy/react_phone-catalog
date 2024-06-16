import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Navigation: React.FC<Props> = ({ setIsOpen }) => {
  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigation__link, {
      [styles.navigation__link_active]: isActive,
    });

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink
            className={activeLink}
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={activeLink}
            to="/phones"
            onClick={() => setIsOpen(false)}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={activeLink}
            to="/tablets"
            onClick={() => setIsOpen(false)}
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink
            className={activeLink}
            to="/accessories"
            onClick={() => setIsOpen(false)}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
