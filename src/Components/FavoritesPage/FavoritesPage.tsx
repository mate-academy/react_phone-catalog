import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './Favorites.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={styles.wrapper}>
        <img
          src="./img/product-not-found.png"
          alt="Not found"
          className={styles.pulseImage}
        />
        <p className={styles.text}>No favorite products yet!</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.counter}>{favorites.length} items</p>

      <div className={styles.list}>
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
