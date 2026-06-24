import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useFav } from '../../context/FavContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favItems } = useFav();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // Logika filtrowania (Search)
  const visibleItems = useMemo(() => {
    let result = [...favItems];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(item =>
        item.name.toLowerCase().includes(normalizedQuery),
      );
    }

    return result;
  }, [favItems, query]);

  return (
    <div className={styles.favouritesPage}>
      <div className="container">
        <Breadcrumbs />

        <header className={styles.header}>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles.count}>{visibleItems.length} items</p>
        </header>

        {/* 1. Sprawdzamy, czy w ogóle są jakieś ulubione */}
        {favItems.length === 0 ? (
          <div className={styles.empty}>
            <p>You have no favorite items yet.</p>
          </div>
        ) : (
          <>
            {/* 2. Sprawdzamy, czy wyszukiwanie coś zwróciło */}
            {visibleItems.length > 0 ? (
              <ProductsList products={visibleItems} />
            ) : (
              <p className={styles.empty}>
                No favorites matching &quot;{query}&quot; found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
