import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import styles from './App.module.scss';
import { ScrollToTop } from './hooks/ScrollToTop';

export const App = () => (
  <div>
    <Header />
    <ScrollToTop />
    <div className={styles.container_content}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
