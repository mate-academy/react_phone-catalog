import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../shared/components/EmptyState';
import { ErrorState } from '../shared/components/ErrorState';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';
import { getProducts } from '../shared/services/api';
import { ProductSummary } from '../shared/types/catalog';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = (searchParams.get('query') ?? '').trim().toLowerCase();

  const favoriteProducts = useMemo(
    () =>
      products
        .filter(product => favoriteIds.includes(product.itemId))
        .filter(product => product.name.toLowerCase().includes(query)),
    [favoriteIds, products, query],
  );
  const showEmptyQueryResult =
    !isLoading && !hasError && !!favoriteIds.length && !favoriteProducts.length;

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.subtitle}>{favoriteProducts.length} items saved</p>
      </div>

      {isLoading && <Loader label="Loading favorites..." />}
      {hasError && <ErrorState />}

      {!isLoading && !hasError && !favoriteIds.length && (
        <EmptyState
          title="Your favorites list is empty"
          description={
            'Press the heart icon on any product card and it will appear here.'
          }
        />
      )}

      {showEmptyQueryResult && (
        <EmptyState title="There are no products matching the query" />
      )}

      {!isLoading && !hasError && !!favoriteProducts.length && (
        <ProductsList products={favoriteProducts} />
      )}
    </section>
  );
};
