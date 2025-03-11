import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className={styles.App}>
    <Header />
    <h1 hidden>Product Catalog</h1>

    <Outlet />

    <Footer />
  </div>
);
