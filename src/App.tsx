import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header';
import { Footer } from './components/Footer';
import styles from './App.module.scss';

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
