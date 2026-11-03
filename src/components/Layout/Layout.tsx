import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

export const Layout = () => (
  <>
    <Header />
    <div className={styles.layout}>
      <Outlet />
    </div>
    <Footer />
  </>
);
