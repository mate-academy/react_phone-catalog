import { Outlet } from 'react-router-dom';
import styles from '../src/App.module.scss';

export const MainLayout = () => {
  return (
    <main className={styles.appContent}>
      <Outlet />
    </main>
  );
};
