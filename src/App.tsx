import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import styles from './App.module.scss';

export const App = () => (
  <div className={styles.app}>
    <Header />

    <main className={styles.main}>
      <Outlet />
    </main>

    <Footer />
  </div>
);
