import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { useFavorites } from '../../contexts/FavoritesContext';
import {
  fetchListProducts,
  filterProductsByQuery,
} from '../../services/products';
import styles from './FavoritesPage.module.scss';
import type { Product } from '../../types';

export const FavoritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam || '4');

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchListProducts()
      .then(items =>
        setProducts(
          items.filter(item =>
            favorites.includes(item.itemId || item.id.toString()),
          ),
        ),
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [favorites]);

  const filtered = useMemo(
    () => filterProductsByQuery(products, query),
    [products, query],
  );
  const total = filtered.length;
  const currentPage = Math.max(
    1,
    Math.min(
      page,
      Math.max(1, perPage === 'all' ? 1 : Math.ceil(total / perPage)),
    ),
  );

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return filtered;
    }

    const start = (currentPage - 1) * perPage;

    return filtered.slice(start, start + perPage);
  }, [filtered, perPage, currentPage]);

  const updatePerPage = (nextPerPage: number | 'all') => {
    const next = new URLSearchParams(searchParams);

    next.set('perPage', String(nextPerPage));
    next.set('page', '1');
    setSearchParams(next);
  };

  const updatePage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      next.delete('page');
    } else {
      next.set('page', String(nextPage));
    }

    setSearchParams(next);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p>Something went wrong while loading favorites.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.message}>You have no favorite products yet.</div>
    );
  }

  if (!filtered.length) {
    return (
      <div className={styles.message}>
        There are no favorite products matching the query.
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Favorites</h1>
      <div className={styles.toolbar}>
        <label>
          Items per page:
          <select
            value={perPage}
            onChange={event =>
              updatePerPage(
                event.target.value === 'all'
                  ? 'all'
                  : Number(event.target.value),
              )
            }
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
      <ProductsList products={visibleProducts} />
      {perPage !== 'all' && (
        <Pagination
          page={currentPage}
          perPage={perPage}
          total={total}
          onPageChange={updatePage}
        />
      )}
    </main>
  );
};
