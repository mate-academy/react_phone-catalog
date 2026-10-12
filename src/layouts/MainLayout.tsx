import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../shared/components';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
