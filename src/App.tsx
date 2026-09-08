import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header/Header';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.App}>
      <Header />

      <main className={styles.App__main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
