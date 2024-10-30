import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import { Footer } from '../Footer';
import { Header } from '../header';
import { ScrollToTop } from '../ScrollToTop';

export const Layout = () => (
  <div className={styles.layout}>
    <ScrollToTop />
    <Header />
    <div className={styles.layout__content}>
      <Outlet />
      <Footer />
    </div>
  </div>
);
