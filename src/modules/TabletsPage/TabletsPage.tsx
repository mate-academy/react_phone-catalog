import styles from './TabletsPage.module.scss';

import React from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import { useProducts } from '../shared/hooks/useProducts';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

type Props = {
  cart: number[];
  favorites: number[];
  toggleCart: (id: number) => void;
  toggleFavorites: (id: number) => void;
};

export const TabletsPage: React.FC<Props> = ({
  cart,
  favorites,
  toggleCart,
  toggleFavorites,
}) => {
  const { products, isLoading, hasError, reload } = useProducts();
  const tablets = products.filter(product => product.category === 'tablets');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Tablets' }]} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Mobile phones</h1>
          {!isLoading && !hasError && (
            <div className={styles.modelsCount}>{tablets.length} models</div>
          )}
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && <ErrorMessage onReload={reload} />}

        {!isLoading && !hasError && (
          <ProductsList
            products={tablets}
            cart={cart}
            favorites={favorites}
            toggleCart={toggleCart}
            toggleFavorites={toggleFavorites}
            emptyMessage=""
          />
        )}
      </div>
    </main>
  );
};
