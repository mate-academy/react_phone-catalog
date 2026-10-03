import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../context';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductsList } from '../ProductsList';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <Breadcrumbs category="favorites" />

      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>There are no favorite products yet</p>
          <Link to="/phones" className={styles.exploreBtn}>
            Explore Phones
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.count}>
            {favorites.length} {favorites.length === 1 ? 'model' : 'models'}
          </p>
          <ProductsList products={favorites} />
        </>
      )}
    </div>
  );
};
