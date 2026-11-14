import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import { useStore } from '../shared/context/StoreContext';
import styles from './FavoritesPage.module.scss';
export const FavoritesPage: React.FC = () => {
  const { favorites } = useStore();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase().trim();

  const filteredFavorites = useMemo(() => {
    if (!query) return favorites;
    return favorites.filter((p) => p.name.toLowerCase().includes(query));
  }, [favorites, query]);

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />

      <div className={styles.favoritesPage__header}>
        <h1 className={styles.favoritesPage__title}>Favorites</h1>
        <p className={styles.favoritesPage__count}>
          {filteredFavorites.length} items
        </p>
      </div>

      {favorites.length === 0 ? (
        <p className={styles.favoritesPage__empty}>
          You have not added any favorite products yet
        </p>
      ) : filteredFavorites.length === 0 ? (
        <p className={styles.favoritesPage__empty}>
          There are no favorites matching the query
        </p>
      ) : (
        <ProductsList products={filteredFavorites} />
      )}
    </div>
  );
};
