import React from 'react';
import styles from './FavoritesPage.module.scss';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';

export function FavoritesPage() {
  const { favourites } = useCart();

  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Favourites</h1>

      {favourites.length === 0 ? (
        <p className={styles.empty}>У тебе ще немає улюблених товарів 😔</p>
      ) : (
        <div className={styles.grid}>
          {favourites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
