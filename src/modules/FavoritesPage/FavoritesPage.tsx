import React from 'react';
import { useFavorites } from '../shared/context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{`${favorites.length} items`}</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>Your favourites list is empty</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
