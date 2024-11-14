// src/pages/FavoritesPage.tsx
import React from 'react';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites, totalFavorites } = useFavorites();

  return (
    <div>
      {favorites && favorites.length > 0 && (
        <Breadcrumbs categor='Favourites' productDescription={[]} />
      )}
      <h1>Favorites</h1>
      <p
        className={styles.totalFavorites}>{totalFavorites} items</p>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className={styles.productGrid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
