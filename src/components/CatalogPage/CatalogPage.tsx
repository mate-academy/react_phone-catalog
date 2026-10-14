import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { Category } from '../../types/Product';
import { categoryNames } from '../../utils/assets';
import { selectCatalogProducts, SortType } from '../../utils/catalog';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductsList } from '../ProductsList';
import styles from './CatalogPage.module.scss';

const pageSizes = ['4', '8', '16', 'all'];

export const CatalogPage = ({ category }: { category: Category }) => {
  const { products, loading, error, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sortParam = searchParams.get('sort');
  const sort = Object.values(SortType).includes(sortParam as SortType)
    ? (sortParam as SortType)
    : SortType.Newest;
  const perPageParam = searchParams.get('perPage');
  const perPage = pageSizes.includes(perPageParam || '')
    ? perPageParam || 'all'
    : 'all';
  const pageParam = searchParams.get('page') || '1';
  const requestedPage =
    /^\d+$/.test(pageParam) && +pageParam > 0 ? Number(pageParam) : 1;
  const { categoryProducts, filteredProducts, sortedProducts } = useMemo(
    () => selectCatalogProducts(products, category, query, sort),
    [products, category, query, sort],
  );
  const pageSize =
    perPage === 'all' ? Math.max(sortedProducts.length, 1) : Number(perPage);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (
      sortParam !== null &&
      !Object.values(SortType).includes(sortParam as SortType)
    ) {
      nextParams.delete('sort');
    }

    if (perPage === 'all') {
      nextParams.delete('perPage');
    }

    if (!loading && !error) {
      if (currentPage === 1) {
        nextParams.delete('page');
      } else {
        nextParams.set('page', String(currentPage));
      }
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    currentPage,
    error,
    loading,
    perPage,
    searchParams,
    setSearchParams,
    sortParam,
  ]);

  const changeFilter = (key: 'sort' | 'perPage', value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('page');

    if (key === 'perPage' && value === 'all') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  const changePage = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (page === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(page));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={[{ label: categoryNames[category] }]} />
      <h1 className="page-title">
        {category === 'phones' ? 'Mobile phones' : categoryNames[category]}
      </h1>
      {!loading && !error && (
        <p className="page-subtitle">
          {query
            ? `${filteredProducts.length} results`
            : `${categoryProducts.length} models`}
        </p>
      )}

      {loading && <Loader />}
      {!loading && error && (
        <div className="empty-state" role="alert">
          <h2>Something went wrong</h2>
          <p>We couldn&apos;t load the products. Please try again.</p>
          <button className="primary-button" type="button" onClick={reload}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && sortedProducts.length === 0 && (
        <div className="empty-state">
          <h2>
            {query
              ? `There are no ${category} matching the query`
              : `There are no ${category} yet`}
          </h2>
          {query && <p>Try another name or clear the search field.</p>}
        </div>
      )}

      {!loading && !error && sortedProducts.length > 0 && (
        <>
          <div className={styles.filters}>
            <label className={styles.filter} htmlFor="catalog-sort">
              Sort by
              <select
                id="catalog-sort"
                value={sort}
                onChange={event => changeFilter('sort', event.target.value)}
              >
                <option value={SortType.Newest}>Newest</option>
                <option value={SortType.Alphabetically}>Alphabetically</option>
                <option value={SortType.Cheapest}>Cheapest</option>
              </select>
            </label>

            {sortedProducts.length > 4 && (
              <label className={styles.filter} htmlFor="catalog-per-page">
                Items on page
                <select
                  id="catalog-per-page"
                  value={perPage}
                  onChange={event =>
                    changeFilter('perPage', event.target.value)
                  }
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </label>
            )}
          </div>
          <ProductsList products={visibleProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  );
};
