import { Outlet } from 'react-router-dom';
import { Footer } from './modules/Footer';
import { Header } from './modules/Header';

import './styles/globals.scss';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
