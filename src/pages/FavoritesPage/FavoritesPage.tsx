import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useCart();

  return (
    <div className={styles.favorites}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>Your favorites list is empty</p>
      ) : (
        <ul>
          {favorites.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
