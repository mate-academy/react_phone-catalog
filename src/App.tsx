import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import styles from './App.module.scss';

export const App = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.keepScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
