import { Outlet } from 'react-router-dom';

import styles from './App.module.scss';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className={styles.app} id="top">
      <div className={styles.app__header}>
        <Header />
      </div>
      <Menu className={styles.app__menu} />
      <main className={styles.app__container}>
        <Outlet />
      </main>
      <div className={styles.app__footer}>
        <Footer />
      </div>
    </div>
  );
};
