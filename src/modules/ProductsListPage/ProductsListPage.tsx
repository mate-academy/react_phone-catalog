import React, { useMemo, useState, useEffect } from 'react';
import { Product, Category, SortOption } from '../../types';
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

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

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
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('age');
  const [perPage, setPerPage] = useState('all');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(id);
  }, [category]);

  /* reset to page 1 when any filter changes */
  useEffect(() => {
    setPage(1);
  }, [sort, perPage, query]);

  const filtered = useMemo(() => {
    if (!query) {
      return data;
    }

    const q = query.toLowerCase();

    return data.filter(p => p.name.toLowerCase().includes(q));
  }, [data, query]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const totalCount = sorted.length;

  const paginated = useMemo(() => {
    if (perPage === 'all') {
      return sorted;
    }

    const n = Number(perPage);
    const start = (page - 1) * n;

    return sorted.slice(start, start + n);
  }, [sorted, perPage, page]);

  const noProducts = !loading && data.length === 0;
  const noResults = !loading && data.length > 0 && filtered.length === 0;

  return (
    <main className={styles.main}>
      <Breadcrumbs crumbs={[{ label: title }]} />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.count}>{totalCount} models</p>
      </div>

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
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
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
              onChange={e => setPerPage(e.target.value)}
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
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading && <Loader />}

      {noProducts && (
        <p className={styles.emptyMsg}>There are no {category} yet</p>
      )}

      {noResults && (
        <p className={styles.emptyMsg}>
          There are no {category} matching the query
        </p>
      )}

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
              perPage={Number(perPage)}
              currentPage={page}
              onPageChange={p => setPage(p)}
            />
          )}
        </>
      )}
    </main>
  );
};
