import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../../../components/Footer';
import { Header } from '../../../../components/Header';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.layout__content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
