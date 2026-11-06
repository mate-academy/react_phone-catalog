import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />

      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
