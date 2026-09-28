import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/products';
import type { Product, ProductCategory, SortType } from '../../types';
import { filterByQuery, sortProducts } from '../../utils/productHelpers';
import { usePageSearch } from '../../context/SearchContext';
import { useDebounce } from '../../hooks/useDebounce';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { Icon } from '../Icon';
import styles from './CategoryPage.module.scss';

interface Props {
  category: ProductCategory;
  title: string;
}

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const CategoryPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState(searchParams.get('query') || '');

  const sort = (searchParams.get('sort') as SortType) || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || 'all';

  const debouncedQuery = useDebounce(queryInput, 300);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setSearchParams(params => {
      const next = new URLSearchParams(params);

      if (debouncedQuery) {
        next.set('query', debouncedQuery);
      } else {
        next.delete('query');
      }

      next.delete('page');

      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  usePageSearch(
    true,
    `Search in ${title.split(' ')[0]}`,
    queryInput,
    setQueryInput,
  );

  const filteredProducts = useMemo(
    () => sortProducts(filterByQuery(products, debouncedQuery), sort),
    [products, debouncedQuery, sort],
  );

  const perPage =
    perPageParam === 'all'
      ? filteredProducts.length || 1
      : Number(perPageParam);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * perPage;

    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page, perPage]);

  const updateParam = (key: string, value: string, isDefault: boolean) => {
    setSearchParams(params => {
      const next = new URLSearchParams(params);

      if (isDefault) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      if (key !== 'page') {
        next.delete('page');
      }

      return next;
    });
  };

  const categoryLabel = category[0].toUpperCase() + category.slice(1);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>
        {isLoading ? 'Loading…' : `${filteredProducts.length} models`}
      </p>

      {!isLoading && !hasError && products.length > 0 && (
        <div className={styles.toolbar}>
          <label className={styles.field}>
            <span className={styles.label}>Sort by</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={sort}
                onChange={event =>
                  updateParam(
                    'sort',
                    event.target.value,
                    event.target.value === 'age',
                  )
                }
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
              <Icon
                name="chevron-down"
                size={16}
                className={styles.selectIcon}
              />
            </div>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Items on page</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={perPageParam}
                onChange={event =>
                  updateParam(
                    'perPage',
                    event.target.value,
                    event.target.value === 'all',
                  )
                }
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
              <Icon
                name="chevron-down"
                size={16}
                className={styles.selectIcon}
              />
            </div>
          </label>
        </div>
      )}

      <ProductsList
        products={paginatedProducts}
        isLoading={isLoading}
        hasError={hasError}
        onReload={loadProducts}
        emptyMessage={
          debouncedQuery
            ? `There are no ${categoryLabel.toLowerCase()} matching the query`
            : `There are no ${categoryLabel.toLowerCase()} yet`
        }
      />

      {!isLoading && !hasError && (
        <Pagination
          total={filteredProducts.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={next => updateParam('page', String(next), next === 1)}
        />
      )}
    </div>
  );
};
