import React from 'react';
import { Product, SortType } from '../../../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './CatalogPageContent.module.scss';
import { getSortedProducts } from '../../../../utils/products';
import { ProductList } from '../ProductList/ProductList';
import { Pagination } from '../Pagination';
import { useShop } from '../../../../store/ShopContext';
import { Loader } from '../Loader';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  breadcrumb: string;
  products: Product[];
};

export const CatalogPageContent: React.FC<Props> = ({
  title,
  breadcrumb,
  products,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoadingProducts, error, reloadProducts } = useShop();
  const sortParam = searchParams.get('sort') as SortType;
  const sortBy: SortType =
    sortParam === 'alphabetically' || sortParam === 'cheapest'
      ? sortParam
      : 'newest';

  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParam =
    searchParams.get('perPage') === 'all'
      ? 'all'
      : Number(searchParams.get('perPage')) || 'all';

  const currentPage = pageParam;
  const perPage = perPageParam;

  const maxVisiblePages = 4;
  let startPage = 1;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortType;
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const sortedProducts = getSortedProducts(products, sortBy);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

  let visibleProducts;

  if (perPage === 'all') {
    visibleProducts = sortedProducts;
  } else {
    visibleProducts = sortedProducts.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage,
    );
  }

  if (currentPage >= maxVisiblePages) {
    startPage = currentPage - maxVisiblePages + 2;
  }

  const maxStartPage = Math.max(1, totalPages - maxVisiblePages + 1);

  if (startPage > maxStartPage) {
    startPage = maxStartPage;
  }

  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const visiblePages = [];

  for (let page = startPage; page <= endPage; page++) {
    visiblePages.push(page);
  }

  return (
    <main>
      <div className="container">
        <Breadcrumbs breadcrumb={breadcrumb} />
        <h1 className={styles.pageTitle}>{title}</h1>

        {isLoadingProducts && <Loader />}

        {!isLoadingProducts && error && (
          <div className={styles.error}>
            <p>Something went wrong</p>
            <button
              type="button"
              className={styles.reloadButton}
              onClick={reloadProducts}
            >
              Reload
            </button>
          </div>
        )}

        {!isLoadingProducts && !error && products.length === 0 && (
          <div className={styles.empty}>
            <p>{`There are no ${breadcrumb.toLowerCase()} yet`}</p>
          </div>
        )}

        {!isLoadingProducts && !error && products.length > 0 && (
          <>
            <p className={styles.modelsCount}>{`${products.length} models`}</p>
            <div className={styles.controls}>
              <div className={styles.control}>
                <label htmlFor="sortBy" className={styles.controlLabel}>
                  Sort by
                </label>
                <select
                  id="sortBy"
                  className={styles.controlSelect}
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="alphabetically">Alphabetically</option>
                  <option value="cheapest">Cheapest</option>
                </select>
              </div>

              <div className={styles.control}>
                <label htmlFor="perPage" className={styles.controlLabel}>
                  Items on page
                </label>
                <select
                  id="perPage"
                  className={styles.controlSelect}
                  value={String(perPage)}
                  onChange={handlePerPageChange}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            <ProductList products={visibleProducts} />

            {perPage !== 'all' && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                visiblePages={visiblePages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
