import React from 'react';

import { ProductCard } from '../../components/ProductCard';
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
          {favourites.map(product => (
            <div key={product.id} className={styles.favourites__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className={styles.favourites__empty}>
          Your favourites list is empty.
        </h2>
      )}
    </div>
  );
};
