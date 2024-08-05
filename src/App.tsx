import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import styles from './App.module.scss';

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
