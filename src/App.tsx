//#region imports
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { useTheme } from './modules/shared/hooks/useTheme';
import styles from './App.module.scss';
//#endregion

export const App = () => {
  const { isDark } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [isDark]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
