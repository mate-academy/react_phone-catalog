import styles from './App.module.scss';

import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <div className={styles.app}>
    <Header />
    <div className={styles.container}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
