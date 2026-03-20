import React from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Heading } from '@/components/ui/Heading';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.header}>
        <Heading as="h1" className={styles.title}>
          Favorites
        </Heading>
        <p className={styles.count}>{favorites.length} items</p>
      </div>

      {favorites.length > 0 ? (
        <div className={styles.content}>
          {favorites.map(product => (
            <div key={product.itemId} className={styles.content__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Your favorites list is empty</h2>
          <p className={styles.emptyText}>
            Go back to the store and find something you love!
          </p>
        </div>
      )}
    </div>
  );
};


