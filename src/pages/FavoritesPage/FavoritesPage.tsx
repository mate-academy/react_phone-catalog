import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './FavoritesPage.module.scss';

import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = 'Favorites | Gadgets';
  }, []);

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const queryWords = query.split(/\s+/).filter(Boolean);

  const filteredFavorites = favorites.filter(p => {
    const nameLower = p.name.toLowerCase();

    return queryWords.every(word => nameLower.includes(word));
  });

  const handleClearSearch = () => {
    setSearchParams({ query: '' });
  };

  return (
    <div
      className={`${styles.favoritesPage} container`}
      data-testid="favorites-page"
    >
      <Breadcrumbs category="favorites" categoryLabel="Favorites" />

      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You have no favorite products yet.</p>
          <Link to="/" className={styles.shopBtn}>
            Find gadgets
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>There are no products matching the query</p>
          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={handleClearSearch}
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div className={styles.count}>
            {filteredFavorites.length}{' '}
            {filteredFavorites.length === 1 ? 'item' : 'items'}
          </div>

          <div className={styles.grid}>
            {filteredFavorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
