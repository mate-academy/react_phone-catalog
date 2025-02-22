import React, { useContext } from 'react';
import styles from './Nav.module.scss';
import { useLocation } from 'react-router-dom';
import { NavLinks } from '../../enums/NavLinks';
import { MainContext } from '../../context/MainContext';
import { NavLink } from './components/NavLink';

export const Nav: React.FC = () => {
  const { isMobile } = useContext(MainContext);
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {Object.values(NavLinks).map((item, index) => {
          const isActiveCondition =
            !isMobile && pathname.startsWith(`/${item}`);
          const isOnHomePage = !isMobile && pathname === '/' && index === 0;

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
