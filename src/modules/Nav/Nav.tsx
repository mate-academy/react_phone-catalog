import React from 'react';
import { useLocation } from 'react-router-dom';

import { MainNavLinks } from '../../enums/MainNavLinks';
import { NavLink } from './components/NavLink';
import styles from './Nav.module.scss';

export const Nav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {Object.values(MainNavLinks).map((item, index) => {
          const isActiveCondition = pathname.startsWith(`/${item}`);
          const isOnHomePage = pathname === '/' && index === 0;

          return (
            <NavLink
              key={item}
              item={item}
              isActiveCondition={isActiveCondition}
              isOnHomePage={isOnHomePage}
            />
          );
        })}
      </ul>
    </nav>
  );
};
