import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <div className={styles.pageTransition} key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
