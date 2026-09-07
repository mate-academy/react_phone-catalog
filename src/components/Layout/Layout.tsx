import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';
import { useFetchProducts } from '../../hooks/useFetchProducts';

export const Layout: React.FC = () => {
  useFetchProducts();

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
