import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Store previous page before navigating to cart
    if (pathname !== '/cart') {
      sessionStorage.setItem('prevPage', pathname);
    }
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.breadcrumbsContainer}>
        <Breadcrumbs />
      </div>
      <main className={styles.layout__content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
