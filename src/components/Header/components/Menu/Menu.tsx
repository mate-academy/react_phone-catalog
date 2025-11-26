import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Menu.module.scss';

export const Menu: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.menu__link, {
      [styles['menu__link--active']]: isActive,
    });

  return (
    <ul className={styles.menu}>
      <li className={styles.menu__item}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
      </li>

      <li className={styles.menu__item}>
        <NavLink to="/phones" className={getLinkClass}>
          Phones
        </NavLink>
      </li>

      <li className={styles.menu__item}>
        <NavLink to="/tablets" className={getLinkClass}>
          Tablets
        </NavLink>
      </li>

      <li className={styles.menu__item}>
        <NavLink to="/accessories" className={getLinkClass}>
          Accessories
        </NavLink>
      </li>
    </ul>
  );
};
