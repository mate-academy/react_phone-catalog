import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';
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
