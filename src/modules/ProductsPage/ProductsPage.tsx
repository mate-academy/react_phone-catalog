import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../shared/components/EmptyState';
import { ErrorState } from '../shared/components/ErrorState';
import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '../shared/constants/catalog';
import { getProducts } from '../shared/services/api';
import {
  Category,
  PerPageOption,
  ProductSummary,
  SortType,
} from '../shared/types/catalog';
import {
  getCategoryEmptyLabel,
  getCategoryLabel,
  paginateProducts,
  sortProducts,
} from '../shared/utils/catalog';
import styles from './ProductsPage.module.scss';

interface Props {
  category: Category;
}

const getSortFromParams = (value: string | null): SortType => {
  if (value === 'title' || value === 'price') {
    return value;
  }

  return 'age';
};

const getPerPageFromParams = (value: string | null): PerPageOption => {
  if (value === '4' || value === '8' || value === '16') {
    return Number(value) as 4 | 8 | 16;
  }

  return 'all';
};

const updateSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string | null,
) => {
  const nextParams = new URLSearchParams(searchParams);

  if (value) {
    nextParams.set(key, value);
  } else {
    nextParams.delete(key);
  }

  return nextParams;
};

export const ProductsPage = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        setProducts(data.filter(product => product.category === category));
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const query = (searchParams.get('query') ?? '').trim().toLowerCase();
  const sort = getSortFromParams(searchParams.get('sort'));
  const perPage = getPerPageFromParams(searchParams.get('perPage'));

  const filteredProducts = useMemo(() => {
    const queryMatchedProducts = products.filter(product =>
      product.name.toLowerCase().includes(query),
    );

    return sortProducts(queryMatchedProducts, sort);
  }, [products, query, sort]);

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const rawPage = Number(searchParams.get('page') ?? '1');
  const currentPage = Math.min(Math.max(1, rawPage || 1), totalPages);
  const visibleProducts = paginateProducts(
    filteredProducts,
    currentPage,
    perPage,
  );

  useEffect(() => {
    if (rawPage > totalPages && totalPages >= 1) {
      const nextParams = updateSearchParams(
        searchParams,
        'page',
        totalPages > 1 ? String(totalPages) : null,
      );

      setSearchParams(nextParams, { replace: true });
    }
  }, [currentPage, rawPage, searchParams, setSearchParams, totalPages]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextParams = updateSearchParams(
      searchParams,
      'sort',
      event.target.value,
    );

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value;
    const nextParams = updateSearchParams(
      searchParams,
      'perPage',
      nextValue === 'all' ? null : nextValue,
    );

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePageChange = (page: number) => {
    const nextParams = updateSearchParams(
      searchParams,
      'page',
      page > 1 ? String(page) : null,
    );

    setSearchParams(nextParams);
  };

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{getCategoryLabel(category)} page</h1>
        <p className={styles.subtitle}>{filteredProducts.length} models</p>
      </div>

      {isLoading && (
        <Loader
          label={`Loading ${getCategoryLabel(category).toLowerCase()}...`}
        />
      )}
      {hasError && <ErrorState />}

      {!isLoading && !hasError && (
        <>
          <div className={styles.controls}>
            <label className={styles.control}>
              <span className={styles.label}>Sort by</span>
              <select
                value={sort}
                onChange={handleSortChange}
                className={styles.select}
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.control}>
              <span className={styles.label}>Items on page</span>
              <select
                value={String(perPage)}
                onChange={handlePerPageChange}
                className={styles.select}
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {!products.length && (
            <EmptyState
              title={`There are no ${getCategoryEmptyLabel(category)} yet`}
            />
          )}

          {!!products.length && !filteredProducts.length && (
            <EmptyState
              title={`There are no ${getCategoryEmptyLabel(category)} matching the query`}
            />
          )}

          {!!filteredProducts.length && (
            <>
              <ProductsList products={visibleProducts} />

              <div className={styles.paginationRow}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
