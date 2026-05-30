import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  fetchProductsByCategory,
  filterProducts,
  getCategoryTitle,
  sortProducts,
} from '../../api/products';
import { Product, SortKey, ProductCategory } from '../../types';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { EmptyState } from '../../components/EmptyState';
import styles from './ProductsPage.module.scss';

const DEFAULT_PER_PAGE = 'all';
const PAGE_OPTIONS = ['4', '8', '16', DEFAULT_PER_PAGE] as const;
const SORT_OPTIONS: Array<[SortKey, string]> = [
  ['age', 'Newest'],
  ['title', 'Alphabetically'],
  ['price', 'Cheapest'],
];

export const ProductsPage = ({ category }: { category: ProductCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = (searchParams.get('sort') ?? 'age') as SortKey;
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const perPage = searchParams.get('perPage') ?? DEFAULT_PER_PAGE;

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetchProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const filtered = useMemo(
    () => filterProducts(products, query),
    [products, query],
  );
  const sorted = useMemo(
    () => sortProducts(filtered, sortParam),
    [filtered, sortParam],
  );

  const pageSize =
    perPage === DEFAULT_PER_PAGE ? sorted.length : Number(perPage);
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const totalPages =
    pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const currentPage = Math.min(safePage, totalPages);
  const visibleProducts =
    perPage === DEFAULT_PER_PAGE
      ? sorted
      : sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);

    if (
      !value ||
      value === 'age' ||
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === DEFAULT_PER_PAGE)
    ) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  };

  const handleSort = (value: SortKey) => updateParam('sort', value);
  const handlePerPage = (value: string) => {
    updateParam('perPage', value);
    updateParam('page', '1');
  };

  const handlePageChange = (newPage: number) =>
    updateParam('page', String(newPage));

  return (
    <div className={styles.productsPage}>
      <div className={styles.headerRow}>
        <h1>{getCategoryTitle(category)} page</h1>
        <div className={styles.controlsRow}>
          <label className={styles.label}>
            Sort by
            <select
              value={sortParam}
              onChange={event => handleSort(event.target.value as SortKey)}
            >
              {SORT_OPTIONS.map(([key, title]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Items per page
            <select
              value={perPage}
              onChange={event => handlePerPage(event.target.value)}
            >
              {PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {isLoading && <Loader />}
      {error && (
        <div className={styles.error}>
          <p>Something went wrong while loading products.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}
      {!isLoading && !error && sorted.length === 0 && (
        <EmptyState
          message={
            query
              ? `There are no ${category} matching the query`
              : `There are no ${category} yet`
          }
        />
      )}
      {!isLoading && !error && sorted.length > 0 && (
        <>
          <ProductList products={visibleProducts} />
          <div className={styles.paginationRow}>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
