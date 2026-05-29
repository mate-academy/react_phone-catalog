import React, { useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import styles from './styles.module.scss';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductsList } from '@/components/ProductsList';
import { useProducts } from '@/app/providers/Products/ProductsContext';

export const PhonesPage: React.FC = () => {
  const { pathname } = useLocation();
  const match = useMatch(pathname);
  const { products, loadProducts } = useProducts();

  console.log(match?.pathname);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main>
      <div className={styles.content}>
        <Breadcrumbs></Breadcrumbs>
        <h1>Mobile phones</h1>
        {products && <ProductsList products={products.slice(0, 30)}></ProductsList>}
      </div>
    </main>
  );
};
