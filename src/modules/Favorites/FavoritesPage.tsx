import React from 'react';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsGrid } from '../shared/components/ProductsGrid';
import { PageTitle } from '../shared/components/PageTitle';
import { useFavoritesPage } from './useFavoritesPage';

export const FavoritesPage: React.FC = () => {
  const { favoriteProducts, count } = useFavoritesPage();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <PageTitle>Favorites</PageTitle>
      <p className={styles.count}>{favoriteProducts.length} items</p>

      {count === 0 ? (
        <h2 className={styles.emptyMessage}>Your favorites list is empty</h2>
      ) : (
        <ProductsGrid products={favoriteProducts} />
      )}
    </div>
  );
};
