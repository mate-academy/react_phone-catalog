import styles from './App.module.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
