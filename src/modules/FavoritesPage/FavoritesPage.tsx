import React, { useMemo, useState } from 'react';
import { useFavorites } from '../shared/context/FavoritesContext';
import { usePageSearch } from '../shared/context/SearchContext';
import { useDebounce } from '../shared/hooks/useDebounce';
import { filterByQuery } from '../shared/utils/productHelpers';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [queryInput, setQueryInput] = useState('');
  const debouncedQuery = useDebounce(queryInput, 300);

  usePageSearch(true, 'Search in favorites', queryInput, setQueryInput);

  const filtered = useMemo(
    () => filterByQuery(favorites, debouncedQuery),
    [favorites, debouncedQuery],
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{filtered.length} items</p>

      <ProductsList
        products={filtered}
        isLoading={false}
        hasError={false}
        emptyMessage={
          debouncedQuery
            ? 'There are no products matching the query'
            : 'You have no favorite products yet'
        }
      />
    </div>
  );
};
