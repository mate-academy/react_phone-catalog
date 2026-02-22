import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    if (!query) {
      return favorites;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return favorites.filter(p =>
      p.name.toLowerCase().includes(normalizedQuery),
    );
  }, [favorites, query]);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{filteredFavorites.length} items</p>

      {filteredFavorites.length === 0 ? (
        query ? (
          <NoResults categoryName="products matching the query" />
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>No favorites added yet</h2>
          </div>
        )
      ) : (
        <ProductsList products={filteredFavorites} />
      )}
    </div>
  );
};
