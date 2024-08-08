import styles from './App.module.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className={styles.app}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);
