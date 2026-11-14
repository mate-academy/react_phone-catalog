import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../shared/components/Loader/Loader';
import { Pagination } from '../shared/components/Pagination/Pagination';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import { getProductsByCategory } from '../shared/services/api';
import { Category, Product } from '../shared/types/Product';
import styles from './ProductsPage.module.scss';

interface Props {
  category: Category;
  title: string;
}

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page') || '1');
  const query = (searchParams.get('query') || '').toLowerCase().trim();

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

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        !value ||
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all')
      ) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = query
      ? products.filter((p) => p.name.toLowerCase().includes(query))
      : products;

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'age':
        default:
          return b.year - a.year;
      }
    });
  }, [products, query, sort]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return filteredAndSorted;
    }

    const limit = Number(perPage);
    const start = (currentPage - 1) * limit;
    return filteredAndSorted.slice(start, start + limit);
  }, [filteredAndSorted, perPage, currentPage]);

  const showPagination =
    perPage !== 'all' && filteredAndSorted.length > Number(perPage);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: category.charAt(0).toUpperCase() + category.slice(1) },
        ]}
      />

      <div className={styles.page__header}>
        <h1 className={styles.page__title}>{title}</h1>
        <p className={styles.page__count}>{filteredAndSorted.length} models</p>
      </div>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.page__status}>
          <p>Something went wrong</p>
          <button
            type="button"
            onClick={loadProducts}
            className={styles.page__reloadBtn}
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <p className={styles.page__status}>There are no {category} yet</p>
      )}

      {!isLoading &&
        !hasError &&
        products.length > 0 &&
        filteredAndSorted.length === 0 && (
          <p className={styles.page__status}>
            There are no {category} matching the query
          </p>
        )}

      {!isLoading && !hasError && filteredAndSorted.length > 0 && (
        <>
          <div className={styles.page__controls}>
            <label className={styles.page__control}>
              <span className={styles.page__controlLabel}>Sort by</span>
              <select
                value={sort}
                onChange={(e) =>
                  updateParams({ sort: e.target.value, page: '1' })
                }
                className={styles.page__select}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label className={styles.page__control}>
              <span className={styles.page__controlLabel}>Items on page</span>
              <select
                value={perPage}
                onChange={(e) =>
                  updateParams({ perPage: e.target.value, page: '1' })
                }
                className={styles.page__select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </label>
          </div>

          <ProductsList products={visibleProducts} />

          {showPagination && (
            <Pagination
              totalItems={filteredAndSorted.length}
              perPage={Number(perPage)}
              currentPage={currentPage}
              onPageChange={(page) => updateParams({ page: String(page) })}
            />
          )}
        </>
      )}
    </div>
  );
};
