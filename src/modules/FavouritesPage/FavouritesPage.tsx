import React from 'react';

import { ProductsList } from '../../components/ProductsList';
import { useFavourites } from '../../context/FavoritesContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.favourites}>
      <h1 className={styles.favourites__title}>Favourites</h1>
      <div className={styles.favourites__quantity}>
        {favourites.length} {favourites.length === 1 ? 'item' : 'items'}
      </div>

      {favourites.length > 0 ? (
        <div className={styles.favourites__products}>
          <ProductsList products={favourites} />
        </div>
      ) : (
        <h2 className={styles.favourites__empty}>
          Your favourites list is empty.
        </h2>
      )}
    </div>
  );
};
