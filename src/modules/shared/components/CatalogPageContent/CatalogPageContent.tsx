import React, { useState } from 'react';
import { Product, SortType, ItemsPerPage } from '../../../../types/Product';
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
  const [perPage, setPerPage] = useState<ItemsPerPage>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoadingProducts, error, reloadProducts } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') as SortType;
  const [sortBy, setSortBy] = useState<SortType>(sortParam || 'newest');
  const maxVisiblePages = 4;
  let startPage = 1;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortType;

    setSortBy(value);
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setPerPage(value === 'all' ? 'all' : (Number(value) as ItemsPerPage));
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
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
