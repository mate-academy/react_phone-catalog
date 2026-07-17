import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, sortProducts } from '../../../../api/products';
import { Category, Product, SortOption } from '../../../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import styles from './CatalogPage.module.scss';

interface Props {
  category: Category;
  title: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'] as const;

export const CatalogPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortOption) || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || '16';
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam) || 16;

  const load = () => {
    setLoading(true);
    setError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  const visible = useMemo(() => {
    if (perPage === 'all') {
      return sorted;
    }

    const start = (page - 1) * perPage;

    return sorted.slice(start, start + perPage);
  }, [sorted, page, perPage]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === '' ||
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === '16') ||
        (key === 'sort' && value === 'age')
      ) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={[{ label: categoryLabel }]} />

      <h1 className={styles.title}>{title}</h1>
      {!loading && !error && (
        <p className={styles.count}>{products.length} models</p>
      )}

      {loading && <Loader />}

      {error && (
        <div className={styles.state}>
          <p>Something went wrong</p>
          <button type="button" className={styles.reload} onClick={load}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className={styles.state}>There are no {category} yet</p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className={styles.filters}>
            <label className={styles.filter}>
              <span className={styles.filterLabel}>Sort by</span>
              <select
                className={styles.select}
                value={sort}
                onChange={event =>
                  updateParams({
                    sort: event.target.value,
                    page: '1',
                  })
                }
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.filter}>
              <span className={styles.filterLabel}>Items on page</span>
              <select
                className={styles.select}
                value={perPageParam}
                onChange={event =>
                  updateParams({
                    perPage: event.target.value,
                    page: '1',
                  })
                }
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <ProductsList products={visible} />

          <Pagination
            total={sorted.length}
            perPage={perPage}
            currentPage={page}
            onPageChange={nextPage => updateParams({ page: String(nextPage) })}
          />
        </>
      )}
    </div>
  );
};
