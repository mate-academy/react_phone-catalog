import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ScrollToTop } from '../ScrollToTop';
import styles from './AppLayout.module.scss';

export const AppLayout = () => (
  <div className={styles.layout}>
    <ScrollToTop />
    <Header />

    <main className={styles.main}>
      <Outlet />
    </main>

    <Footer />
  </div>
);
