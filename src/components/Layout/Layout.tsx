import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useBreadcrumbs } from '../../shared/helpers/useBreadcrumbs';

export const Layout = () => {
  const location = useLocation();
  const items = useBreadcrumbs();

  return (
    <>
      <Header />

      <main className={styles.main}>
        {location.pathname !== '/' && location.pathname !== '/cart' && (
          <Breadcrumbs items={items} />
        )}

        <div className={styles.pageWrapper}>
          <div key={location.pathname} className={styles.pageTransition}>
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
