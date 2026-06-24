import styles from './Layout.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
