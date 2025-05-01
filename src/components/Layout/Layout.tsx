import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer';

import styles from './Layout.module.scss';

export const Layout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
