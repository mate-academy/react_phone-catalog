import React from 'react';
import styles from './FavoritesPage.module.scss';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../shared/hooks/useFavorites';
import { ProductCard } from '../../shared/components/ProductCard';
import { SkeletonCardLoader } from '../../shared/components/SkeletonCardLoader';
import { useCatalogProducts } from '../../shared/hooks/useCatalogProducts';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { isLoading } = useCatalogProducts();

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <span className={styles.homeIcon} aria-label="Home" />
        </Link>
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />
        <p className={styles.breadcrumbsTitle}>Favorites</p>
      </div>

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.favoritesCount}>{favorites.length} items</p>

      <div className={styles.favoritesGrid}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCardLoader key={i} />
          ))}

        {!isLoading && favorites.length === 0 && (
          <p>There are no favorites yet</p>
        )}

        {!isLoading &&
          favorites.length > 0 &&
          favorites.map(item => <ProductCard key={item.id} product={item} />)}
      </div>
    </main>
  );
};
