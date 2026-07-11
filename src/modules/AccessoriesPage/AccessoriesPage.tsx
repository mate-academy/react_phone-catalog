import styles from './AccessoriesPage.module.scss';

import React from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useProducts } from '../shared/hooks/useProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const AccessoriesPage: React.FC = () => {
  const { products, isLoading, hasError, reload } = useProducts();
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Accessories' }]} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Mobile phones</h1>
          {!isLoading && !hasError && (
            <div className={styles.modelsCount}>
              {accessories.length} models
            </div>
          )}
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && <ErrorMessage onReload={reload} />}

        {!isLoading && !hasError && (
          <ProductsList products={accessories} emptyMessage="" />
        )}
      </div>
    </main>
  );
};
