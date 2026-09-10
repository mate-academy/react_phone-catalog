import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { Footer } from '@/modules/Footer';
import { Header } from '@/modules/Header';

export const App = () => (
  <div className={styles.app}>
    <Header />
    <div className={styles.contentWrapper}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
