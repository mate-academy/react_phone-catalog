import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import styles from './App.module.scss';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
