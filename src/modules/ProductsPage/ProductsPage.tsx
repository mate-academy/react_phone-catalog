import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category, Product } from '@shared/types';
import { getProductsByCategory } from '@shared/api';
import { useTranslation } from '@shared/context';
import { filterProductsByQuery } from '@shared/utils';
import { Breadcrumbs } from '@shared/components/Breadcrumbs';
import { ProductsList } from '@shared/components/ProductsList';
import { ProductsListSkeleton } from '@shared/components/ProductsListSkeleton';
import { Dropdown } from './components/Dropdown';
import { Pagination } from './components/Pagination';
import {
  CATEGORY_INFO,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
  SortBy,
} from './constants';
import { sortProducts } from './utils';
import styles from './ProductsPage.module.scss';

interface Props {
  category: Category;
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const { titleKey, breadcrumbKey, emptyKey, noMatchKey } =
    CATEGORY_INFO[category];

  const { t, tCount } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || DEFAULT_SORT;
  const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const requestedPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(loadProducts, [loadProducts]);

  // Searching narrows the list before it is sorted and cut into pages.
  const matchingProducts = useMemo(
    () => filterProductsByQuery(products, query),
    [products, query],
  );

  const sortedProducts = useMemo(
    () => sortProducts(matchingProducts, sortBy),
    [matchingProducts, sortBy],
  );

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(Math.ceil(sortedProducts.length / Number(perPage)), 1);

  // A page number from the URL may be out of range, e.g. after `perPage` grew.
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const firstItem = (currentPage - 1) * Number(perPage);

    return sortedProducts.slice(firstItem, firstItem + Number(perPage));
  }, [sortedProducts, perPage, currentPage]);

  // Default values are not kept in the URL, so `null` removes a param.
  const updateParams = (params: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value === DEFAULT_SORT ? null : value, page: null });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ title: t(breadcrumbKey) }]} />

      <h1 className={styles.title}>{t(titleKey)}</h1>

      {isLoading && (
        <div className={styles.list}>
          <ProductsListSkeleton />
        </div>
      )}

      {!isLoading && hasError && (
        <div className={styles.message}>
          <p>{t('common.somethingWentWrong')}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadProducts}
          >
            {t('common.reload')}
          </button>
        </div>
      )}

      {!isLoading && !hasError && !products.length && (
        <p className={styles.message}>{t(emptyKey)}</p>
      )}

      {!isLoading && !hasError && !!products.length && (
        <>
          <p className={styles.count}>
            {tCount('models', matchingProducts.length)}
          </p>

          <div className={styles.filters}>
            <Dropdown
              label={t('products.sortBy')}
              value={sortBy}
              options={SORT_OPTIONS.map(({ value, labelKey }) => ({
                value,
                label: t(labelKey),
              }))}
              onChange={handleSortChange}
              className={styles.sort}
            />

            <Dropdown
              label={t('products.itemsOnPage')}
              value={perPage}
              options={PER_PAGE_OPTIONS.map(option => ({
                value: option,
                label: option === 'all' ? t('products.all') : option,
              }))}
              onChange={handlePerPageChange}
              className={styles.perPage}
            />
          </div>

          {matchingProducts.length ? (
            <>
              <div className={styles.list}>
                <ProductsList products={visibleProducts} />
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <p className={styles.message}>{t(noMatchKey)}</p>
          )}
        </>
      )}
    </div>
  );
};
