import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useRef } from 'react';

import styles from './Layout.module.scss';

export const Layout = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      <span ref={headerRef}></span>
      <Header />
      <main key={pathname} className={styles.wrapper__main}>
        <Outlet />
      </main>
      <footer className={styles.wrapper__footer}>
        <Footer />
      </footer>
    </div>
  );
};
