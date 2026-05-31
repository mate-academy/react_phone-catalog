import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SortBy, PerPage } from '../types';
import { getProducts } from '../utils/api';
import { ProductCard } from '../shared/components/ProductCard';
import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './ProductsPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

const categoryTitles: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortLabels: Record<SortBy, string> = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

interface Props {
  category: Category;
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || 'age';
  const perPage = (searchParams.get('perPage') as PerPage) || 'all';
  const page = Number(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);

    if (
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all')
    ) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== 'page') {
      next.delete('page');
    }

    setSearchParams(next);
  };

  const load = () => {
    setLoading(true);
    setError(false);
    getProducts()
      .then(all => setProducts(all.filter(p => p.category === category)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filtered = useMemo(() => {
    if (!query) {
      return products;
    }

    const q = query.toLowerCase();

    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
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
  }, [filtered, sortBy]);

  const perPageNum = perPage === 'all' ? sorted.length : Number(perPage);
  const totalPages = Math.ceil(sorted.length / perPageNum);
  const safePage = Math.min(page, Math.max(totalPages, 1));
  const startIdx = (safePage - 1) * perPageNum;
  const paginated =
    perPage === 'all' ? sorted : sorted.slice(startIdx, startIdx + perPageNum);

  const title = categoryTitles[category];
  const noResultsMsg = `There are no ${category} matching the query`;
  const emptyMsg = `There are no ${category} yet`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>{products.length} models</p>

        {loading && <Loader />}

        {error && !loading && (
          <div className={styles.error}>
            <p>Something went wrong.</p>
            <button className={styles.reloadBtn} onClick={load}>
              Reload
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {products.length > 0 && (
              <div className={styles.controls}>
                <div className={styles.selectGroup}>
                  <label htmlFor="sort-select" className={styles.label}>
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    className={styles.select}
                    value={sortBy}
                    onChange={e => setParam('sort', e.target.value)}
                  >
                    {Object.entries(sortLabels).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectGroup}>
                  <label htmlFor="perpage-select" className={styles.label}>
                    Items on page
                  </label>
                  <select
                    id="perpage-select"
                    className={styles.select}
                    value={perPage}
                    onChange={e => setParam('perPage', e.target.value)}
                  >
                    {(['4', '8', '16', 'all'] as PerPage[]).map(val => (
                      <option key={val} value={val}>
                        {val === 'all' ? 'All' : val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {filtered.length === 0 && query && (
              <p className={styles.empty}>{noResultsMsg}</p>
            )}

            {products.length === 0 && !query && (
              <p className={styles.empty}>{emptyMsg}</p>
            )}

            {paginated.length > 0 && (
              <>
                <div className={styles.grid}>
                  {paginated.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {perPage !== 'all' && (
                  <Pagination
                    total={sorted.length}
                    perPage={perPageNum}
                    currentPage={safePage}
                    onPageChange={p => setParam('page', String(p))}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};
