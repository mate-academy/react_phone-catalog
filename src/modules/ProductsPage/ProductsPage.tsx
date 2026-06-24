import { type ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getProducts } from '../shared/api/apiClient';
import { useAsync } from '../shared/hooks/useAsync';
import { ProductsList } from '../shared/components/ProductsList';
import { Loader } from '../shared/components/Loader';
import type { Product, ProductCategory } from '../shared/types/product';
import styles from './ProductsPage.module.scss';

type SortKey = 'age' | 'title' | 'price';
type PerPage = '4' | '8' | '16' | 'all';

type Props = {
  category: ProductCategory;
};

type ParamsUpdate = {
  query?: string;
  sort?: SortKey;
  perPage?: PerPage;
  page?: number;
};

const TITLES: Record<ProductCategory, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const BREADCRUMB_LABELS: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS: PerPage[] = ['4', '8', '16', 'all'];

const VALID_SORT: SortKey[] = ['age', 'title', 'price'];
const VALID_PER_PAGE: PerPage[] = ['4', '8', '16', 'all'];

const getDiscountedPrice = (p: Product): number => p.price;

const sortProducts = (list: Product[], sort: SortKey): Product[] => {
  const copy = [...list];

  switch (sort) {
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return copy.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
    case 'age':
    default:
      return copy.sort((a, b) => b.year - a.year);
  }
};

const paginate = <T,>(items: T[], page: number, perPage: number): T[] =>
  items.slice((page - 1) * perPage, page * perPage);

export const ProductsPage = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');
  const rawPerPage = searchParams.get('perPage');
  const rawPage = searchParams.get('page');
  const rawQuery = searchParams.get('query');

  const sort: SortKey = VALID_SORT.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : 'age';

  const perPage: PerPage = VALID_PER_PAGE.includes(rawPerPage as PerPage)
    ? (rawPerPage as PerPage)
    : '16';

  const page = Math.max(1, Number(rawPage) || 1);
  const query = rawQuery ?? '';

  const fetchByCategory = useCallback(
    () => getProducts().then(all => all.filter(p => p.category === category)),
    [category],
  );

  const { data: products, loading, error, reload } = useAsync(fetchByCategory);

  const filtered = useMemo(() => {
    const all = products ?? [];

    if (!query) {
      return all;
    }

    const q = query.toLowerCase();

    return all.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const totalItems = sorted.length;

  const perPageNum = useMemo(
    () => (perPage === 'all' ? Math.max(totalItems, 1) : Number(perPage)),
    [perPage, totalItems],
  );

  const totalPages = Math.ceil(totalItems / perPageNum) || 1;
  const clampedPage = Math.max(1, Math.min(page, totalPages));

  const visible = useMemo(
    () =>
      perPage === 'all' ? sorted : paginate(sorted, clampedPage, perPageNum),
    [perPage, sorted, clampedPage, perPageNum],
  );

  useEffect(() => {
    if (products && clampedPage !== page) {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);

          if (clampedPage === 1) {
            next.delete('page');
          } else {
            next.set('page', String(clampedPage));
          }

          return next;
        },
        { replace: true },
      );
    }
  }, [clampedPage, page, products, setSearchParams]);

  const setParams = (update: ParamsUpdate) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if ('query' in update) {
        if (!update.query) {
          next.delete('query');
        } else {
          next.set('query', update.query);
        }
      }

      if ('sort' in update) {
        if (!update.sort || update.sort === 'age') {
          next.delete('sort');
        } else {
          next.set('sort', update.sort);
        }
      }

      if ('perPage' in update) {
        if (!update.perPage || update.perPage === '16') {
          next.delete('perPage');
        } else {
          next.set('perPage', update.perPage);
        }
      }

      if ('page' in update) {
        const p = update.page ?? 1;

        next.set('page', String(p));
      }

      if ('sort' in update || 'perPage' in update || 'query' in update) {
        next.delete('page');
      }

      if (next.get('page') === '1') {
        next.delete('page');
      }

      if (next.get('perPage') === 'all') {
        next.delete('page');
      }

      return next;
    });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParams({ sort: e.target.value as SortKey });
  };

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParams({ perPage: e.target.value as PerPage });
  };

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage });
  };

  const showPagination = perPage !== 'all' && totalPages > 1;

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.status}>Something went wrong: {error}</p>
        <button type="button" onClick={reload} className={styles.reloadBtn}>
          Try again
        </button>
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{TITLES[category]}</h1>
        <p className={styles.status}>
          There are no {TITLES[category].toLowerCase()} yet
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 7.5L8 3l5.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 6.5V12.5H11.5V6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">
          &gt;
        </span>
        <span className={styles.breadcrumbCurrent}>
          {BREADCRUMB_LABELS[category]}
        </span>
      </nav>

      <h1 className={styles.title}>{TITLES[category]}</h1>
      <p className={styles.count}>{totalItems} models</p>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="sort-select" className={styles.controlLabel}>
            Sort by
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="sort-select"
              className={`${styles.select} ${styles.selectWide}`}
              value={sort}
              onChange={handleSortChange}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="per-page-select" className={styles.controlLabel}>
            Items on page
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="per-page-select"
              className={`${styles.select} ${styles.selectNarrow}`}
              value={perPage}
              onChange={handlePerPageChange}
            >
              {PER_PAGE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {totalItems === 0 && query ? (
        <p className={styles.noResults}>
          There are no {TITLES[category].toLowerCase()} matching «{query}»
        </p>
      ) : (
        <ProductsList products={visible} />
      )}

      {showPagination && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => handlePageChange(p)}
              className={cn(styles.pageBtn, {
                [styles.pageBtnActive]: p === clampedPage,
              })}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
