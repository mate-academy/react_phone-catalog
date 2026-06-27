import React, { useContext } from 'react';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import { FavoritesContext } from '../shared/context/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';

export const FavoritesPage: React.FC = () => {
  const favoritesContext = useContext(FavoritesContext);

  const favorites = favoritesContext?.favorites || [];

  return (
    <section className={styles.favorites}>
      <div className="container">
        <Breadcrumbs />
        <h1 className={styles.favorites__title}>Favorites</h1>
        <p className={styles.favorites__count}>{favorites.length} items</p>

        {favorites.length > 0 ? (
          <div className={styles.favorites__content}>
            <ProductsList products={favorites} />
          </div>
        ) : (
          <div className={styles.favorites__empty}>
            <h2>Your favorites list is empty 💔</h2>
            <p>Go to the catalog and add some products!</p>
          </div>
        )}
      </div>
    </section>
  );
};
