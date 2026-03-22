import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category, SortOption, PerPageOption } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './ProductsListPage.module.scss';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS: PerPageOption[] = [4, 8, 16, 'all'];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'age':
        return b.year - a.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });
}

interface Props {
  category: Category;
  title: string;
  data: Product[];
}

export const ProductsListPage: React.FC<Props> = ({
  category,
  title,
  data,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const sortParam = (searchParams.get('sort') || 'age') as SortOption;
  const pageParam = Number(searchParams.get('page') || '1');
  const perPageParam = searchParams.get('perPage') || 'all';
  const queryParam = searchParams.get('query') || '';

  const perPage: PerPageOption =
    perPageParam === 'all' ? 'all' : (Number(perPageParam) as PerPageOption);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(id);
  }, [category]);

  const setParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      const isDefault =
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all') ||
        (key === 'sort' && value === 'age') ||
        (key === 'query' && value === '');

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isDefault ? next.delete(key) : next.set(key, value);

      return next;
    });
  };

  /* derived data */
  const filtered = useMemo(() => {
    if (!queryParam) {
      return data;
    }

    const q = queryParam.toLowerCase();

    return data.filter(p => p.name.toLowerCase().includes(q));
  }, [data, queryParam]);

  const sorted = useMemo(
    () => sortProducts(filtered, sortParam),
    [filtered, sortParam],
  );

  const totalCount = sorted.length;

  const paginated = useMemo(() => {
    if (perPage === 'all') {
      return sorted;
    }

    const start = (pageParam - 1) * (perPage as number);

    return sorted.slice(start, start + (perPage as number));
  }, [sorted, perPage, pageParam]);

  /* states */
  const noProducts = !loading && data.length === 0;
  const noResults = !loading && data.length > 0 && filtered.length === 0;

  return (
    <main className={styles.main}>
      <Breadcrumbs crumbs={[{ label: title }]} />

      {/* Page heading */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.count}>{totalCount} models</p>
      </div>

      {/* Controls */}
      {!loading && data.length > 0 && (
        <div className={styles.controls}>
          {/* Sort */}
          <div className={styles.selectGroup}>
            <label className={styles.selectLabel} htmlFor="sort-select">
              Sort by
            </label>
            <select
              id="sort-select"
              className={styles.select}
              value={sortParam}
              onChange={e => setParam('sort', e.target.value)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Items per page */}
          <div className={styles.selectGroup}>
            <label className={styles.selectLabel} htmlFor="per-page-select">
              Items on page
            </label>
            <select
              id="per-page-select"
              className={styles.select}
              value={perPage}
              onChange={e => {
                setParam('perPage', e.target.value);
                setParam('page', '1');
              }}
            >
              {PER_PAGE_OPTIONS.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className={styles.searchGroup}>
            <label className={styles.selectLabel} htmlFor="search-input">
              Search
            </label>
            <input
              id="search-input"
              type="search"
              className={styles.searchInput}
              placeholder={`Search in ${title.toLowerCase()}…`}
              value={queryParam}
              onChange={e => {
                setParam('query', e.target.value);
                setParam('page', '1');
              }}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && <Loader />}

      {/* Empty — no products at all */}
      {noProducts && (
        <p className={styles.emptyMsg}>There are no {category} yet</p>
      )}

      {/* Empty — query has no results */}
      {noResults && (
        <p className={styles.emptyMsg}>
          There are no {category} matching the query
        </p>
      )}

      {/* Product grid */}
      {!loading && paginated.length > 0 && (
        <>
          <div className={styles.grid}>
            {paginated.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {perPage !== 'all' && (
            <Pagination
              total={totalCount}
              perPage={perPage as number}
              currentPage={pageParam}
              onPageChange={p => setParam('page', String(p))}
            />
          )}
        </>
      )}
    </main>
  );
};
