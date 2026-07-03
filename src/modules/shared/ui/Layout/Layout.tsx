import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <div className={`${styles.content} container`}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
