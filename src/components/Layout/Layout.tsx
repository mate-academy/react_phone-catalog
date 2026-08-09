import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
