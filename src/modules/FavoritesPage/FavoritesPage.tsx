// src/modules/FavoritesPage/FavoritesPage.tsx

import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductPageLayout } from '../../styles/ProductPageLayout';
import { ProductsList } from '../../component/ProductList/ProductList';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <ProductPageLayout title="Favourites">
      {favorites.length > 0 ? (
        <ProductsList products={favorites} />
      ) : (
        <div className={styles.emptyWrapper}>
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>No favourites yet</h2>
            <Link to="/" className={styles.backButton}>
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </ProductPageLayout>
  );
};
