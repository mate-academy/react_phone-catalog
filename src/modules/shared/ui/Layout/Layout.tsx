import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
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
