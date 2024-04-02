import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';

export const App = () => (
  <div className={styles.App}>
    <Header />

    <main>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
