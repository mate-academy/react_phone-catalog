import './index.scss';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/components/Footer/Footer';
import { Header } from './modules/shared/components/Header/Header';
import ScrollToTop from './modules/shared/components/ScrollToTop/ScrollToTop';

export const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <ScrollToTop />

        <Header />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
};
