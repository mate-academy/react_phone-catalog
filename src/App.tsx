import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Layout/NavBar';
import { Footer } from './components/Layout/Footer';

export const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};
