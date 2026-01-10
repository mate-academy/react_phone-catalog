import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { EmptyState } from '../shared/components/EmptyState';
import {
  ProductsList,
  ProductsListSkeleton,
} from '../shared/components/ProductsList';
import { getProducts } from '../shared/api/products';
import { useDebounce } from '../shared/hooks/useDebounce';
import { useSearchConfig } from '../shared/context/SearchContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { Product } from '../shared/types';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebounce(query, 400);

  const searchConfig = useMemo(
    () => ({
      visible: true,
      value: query,
      placeholder: 'Search favorites',
      onChange: setQuery,
    }),
    [query],
  );

  useSearchConfig(searchConfig);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getProducts();

      setProducts(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
    const normalized = debouncedQuery.trim();

    if (currentQuery === normalized) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (normalized) {
      params.set('query', normalized);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, [debouncedQuery, searchParams, setSearchParams]);

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.itemId),
  );

  const filtered = favoriteProducts.filter(product =>
    product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <Container className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      {loading && <ProductsListSkeleton />}
      {error && <EmptyState title="Something went wrong" />}

      {!loading && !error && (
        <>
          {filtered.length ? (
            <ProductsList products={filtered} />
          ) : (
            <EmptyState
              title={
                favoriteProducts.length
                  ? 'There are no favorites matching the query'
                  : 'You have no favorites yet'
              }
            />
          )}
        </>
      )}
    </Container>
  );
};
