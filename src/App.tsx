import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Layout/NavBar';
import { Footer } from './components/Layout/Footer';

export const App = () => (
  <div className={styles.app}>
    <header className={styles.header}>
      <Navbar favouritesCount={10} cartCount={10} />
    </header>

    <main className={styles.mainContent}>
      <Outlet />
    </main>

    <footer className={styles.footer}>
      <Footer />
    </footer>
  </div>
);
