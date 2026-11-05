import { Outlet } from 'react-router-dom';

import { NavigationTracker } from '@/app/router/NavigationTracker';
import { Footer, Header } from '@/components/organisms';

import styles from './MainTemplate.module.scss';

export const MainTemplate = () => {
  return (
    <div className={styles.container}>
      <Header className={styles.header} />

      <main className={styles.main}>
        <NavigationTracker />
        <Outlet />
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};
