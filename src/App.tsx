import { Outlet } from 'react-router-dom';

import styles from './App.module.scss';
import { Menu } from './components/Menu';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Menu className={styles.app__menu} />
      <main className={styles.app__container}>
        <Outlet />
      </main>
    </div>
  );
};
