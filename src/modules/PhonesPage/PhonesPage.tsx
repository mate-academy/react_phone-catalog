import styles from './PhonesPage.module.scss';

import React from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { useProducts } from '../shared/hooks/useProducts';
import { ProductsList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

type Props = {
  cart: number[];
  favorites: number[];
  toggleCart: (id: number) => void;
  toggleFavorites: (id: number) => void;
};

export const PhonesPage: React.FC<Props> = ({
  cart,
  favorites,
  toggleCart,
  toggleFavorites,
}) => {
  const { products, isLoading, hasError, reload } = useProducts();
  const phones = products.filter(product => product.category === 'phones');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Phones' }]} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Mobile phones</h1>
          {!isLoading && !hasError && (
            <div className={styles.modelsCount}>{phones.length} models</div>
          )}
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && <ErrorMessage onReload={reload} />}

        {!isLoading && !hasError && (
          <ProductsList
            products={phones}
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
