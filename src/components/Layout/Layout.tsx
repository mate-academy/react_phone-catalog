import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

export const Layout = () => (
  <div className={styles.layout}>
    <Header />

    <main className={styles.main}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
