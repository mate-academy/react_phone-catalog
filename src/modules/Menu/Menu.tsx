/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import styles from './Menu.module.scss';
import { MainContext } from '../../context/MainContext';
import { BottomNav } from './components/BottomNav';
import { Nav } from '../Nav';
import { useLocation } from 'react-router-dom';

export const Menu: React.FC = () => {
  const { isMenuShowed, setIsMenuShowed } = useContext(MainContext);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflowY = isMenuShowed ? 'hidden' : 'visible';
  }, [isMenuShowed]);

  useEffect(() => {
    if (isMenuShowed) {
      setIsMenuShowed(false);
    }
  }, [pathname]);

  return (
    <aside
      className={styles.menu}
      style={{
        transform: isMenuShowed ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <Nav />
      <BottomNav />
    </aside>
  );
};
