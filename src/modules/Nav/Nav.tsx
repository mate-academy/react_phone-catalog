import React from 'react';
import styles from './Nav.module.scss';
import { useLocation } from 'react-router-dom';
import { NavLinks } from '../../enums/NavLinks';
import { NavLink } from './components/NavLink';

export const Nav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {Object.values(NavLinks).map((item, index) => {
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
