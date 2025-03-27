import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

export const Layout = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    {/* Footer can be added here */}
  </>
);
