import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isBurgerMenu = location.pathname === '/burgermenu';

  if (isBurgerMenu) {
    return <Outlet />;
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
