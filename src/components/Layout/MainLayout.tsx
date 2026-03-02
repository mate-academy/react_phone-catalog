import React, { useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { useAppContext } from '../../hooks/useAppContext';

export const MainLayout = () => {
  const location = useLocation();
  const { state } = useAppContext();

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(state.theme);
  }, [state.theme]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname, location.search]);

  const isProductPage =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories' ||
    location.pathname === '/cart';

  return (
    <div className={styles.wrapper}>
      <Header showSearch={isProductPage} />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
