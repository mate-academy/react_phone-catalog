import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './modules/Footer';
import { Header } from './modules/Header';

import './styles/globals.scss';
import styles from './App.module.scss';
import { useEffect } from 'react';
import { scrollToTop } from './utils/utility';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
