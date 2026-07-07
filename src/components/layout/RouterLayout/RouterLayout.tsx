import styles from './RouterLayout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useProductStore } from '@/store/productStore';
import { ScrollToTop } from '../ScrollToTop';

const HIDDEN_BREADCRUMBS = ['/', '/cart'];

export const RouterLayout = () => {
  const { pathname } = useLocation();
  const { currentProductName } = useProductStore();

  return (
    <div className={styles.appContainer}>
      <ScrollToTop />
      <Header />
      <main className={styles.mainContent}>
        <div className="container">
          {!HIDDEN_BREADCRUMBS.includes(pathname) && (
            <Breadcrumbs productName={currentProductName} />
          )}
          <Outlet />
        </div>
      </main>
      <Footer />
      {/* <ScrollRestoration /> */}
    </div>
  );
};
