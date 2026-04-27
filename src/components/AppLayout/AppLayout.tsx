import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './AppLayout.module.scss';

export const AppLayout = () => (
  <div className={styles.layout}>
    <a id="top" />
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
