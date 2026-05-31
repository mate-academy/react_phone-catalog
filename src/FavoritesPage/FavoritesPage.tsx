import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Favourites' }]} />
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.count}>{favorites.length} items</p>

        {favorites.length === 0 ? (
          <p className={styles.empty}>No favourite items yet</p>
        ) : (
          <div className={styles.grid}>
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
