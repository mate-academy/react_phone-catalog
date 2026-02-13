import { Outlet } from 'react-router-dom';

import { Header } from './modules/shared/Header';
import { Footer } from './modules/shared/Footer';
import styles from './App.module.scss';

export const App = () => (
  <div className={styles.content}>
    <header className={styles.header}>
      <Header />
    </header>

    <main className={styles.main}>
      <div className={styles.limitContainer}>
        <Outlet />
      </div>
    </main>

    <footer className={styles.footer}>
      <div className={styles.limitContainer}>
        <Footer />
      </div>
    </footer>
  </div>
);
