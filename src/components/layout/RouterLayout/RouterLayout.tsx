import styles from './RouterLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useProductStore } from '@/store/productStore';

export const RouterLayout = () => {
  const { pathname } = useLocation();
  const { currentProductName } = useProductStore();

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className="container">
          {pathname !== '/' && <Breadcrumbs productName={currentProductName} />}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
