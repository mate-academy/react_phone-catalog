import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={`${styles.container} ${styles.page__main}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
