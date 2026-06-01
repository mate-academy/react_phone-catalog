import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import {
  fetchListProductsByCategory,
  filterProductsByQuery,
  sortProducts,
} from '../../services/products';
import styles from './CategoryPage.module.scss';
import type { Category, Product } from '../../types';

interface CategoryPageProps {
  category: Category;
  title: string;
}

export const CategoryPage = ({ category, title }: CategoryPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');
  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam || '4');

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchListProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(
    () => sortProducts(filterProductsByQuery(products, query), sort),
    [products, query, sort],
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

  const updateSort = (value: string) => {
    const next = new URLSearchParams(searchParams);

    next.set('sort', value);
    next.set('page', '1');
    setSearchParams(next);
  };

  const updatePerPage = (nextPerPage: number | 'all') => {
    const next = new URLSearchParams(searchParams);

    if (nextPerPage === 'all') {
      next.set('perPage', 'all');
    } else {
      next.set('perPage', String(nextPerPage));
    }

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
        <p>Something went wrong while loading products.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <h1>{title}</h1>
      <p className={styles.count}>{products.length} models</p>
      <div className={styles.toolbar}>
        <label>
          Sort by:
          <select
            value={sort}
            onChange={event => updateSort(event.target.value)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
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
      {query && filtered.length === 0 ? (
        <div className={styles.message}>
          There are no {category} matching the query.
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.message}>There are no {category} yet.</div>
      ) : (
        <>
          <ProductsList products={visibleProducts} />
          {perPage !== 'all' && (
            <Pagination
              page={currentPage}
              perPage={perPage}
              total={total}
              onPageChange={updatePage}
            />
          )}
        </>
      )}
    </main>
  );
};
