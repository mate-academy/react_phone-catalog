import React from 'react';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ContextProps } from '../../types/ContextProps';
import { useOutletContext } from 'react-router-dom';
import { ProductCard } from '../shared/components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { products: allProducts, favorites } = useOutletContext<ContextProps>();

  const favoriteProducts = allProducts.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{favoriteProducts.length} models</p>

      {favoriteProducts.length === 0 ? (
        <h2 className={styles.emptyMessage}>Your favorites list is empty</h2>
      ) : (
        <div className={styles.productsGrid}>
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
