import styles from './App.module.scss';

import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header';
import { Footer } from './components/Footer';
import { MenuProvider } from './contexts/MenuProvider';

export const App = () => (
  <div className={styles.app}>
    <MenuProvider>
      <Header />
    </MenuProvider>
    <div className={styles.container}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
