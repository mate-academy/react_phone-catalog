import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Breadcrumbs } from '@/shared/components';
import { BreadcrumbProvider } from '@/shared/context/BreadcrumbContext';

import styles from './ProductsLayout.module.scss';

export const ProductsLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return (
    <BreadcrumbProvider>
      <Breadcrumbs />

      <section className={styles.body}>
        <Outlet />
      </section>
    </BreadcrumbProvider>
  );
};
