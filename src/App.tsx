import './styles/normalize.scss';
import styles from './App.module.scss';

import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header />
      <Menu />

      <main className={styles.app__main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
