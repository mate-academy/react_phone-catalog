import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductPageLayout } from '../../styles/ProductPageLayout';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>No favourites yet!</h2>
          <Link to="/" className={styles.backButton}>
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return <ProductPageLayout title="Favourites" products={favorites} />;
};
