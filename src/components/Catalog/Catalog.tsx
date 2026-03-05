import React, { useMemo } from 'react';

import { CatalogProducts, PerPageType } from '../../types/Types';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { getPaginatedProducts, getSortedProducts } from '../../utils/helpers';
import styles from './Catalog.module.scss';

interface CatalogProps {
  title: string;
  products: CatalogProducts[];
  errorMessage: string;
  isLoading: boolean;
  onReload: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  title,
  products,
  isLoading,
  errorMessage,
  onReload,
}) => {
  const {
    sort,
    page,
    perPage,
    query,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = useCatalogParams();

  const filteredProducts = useMemo(() => {
    if (!query) {
      return products;
    }

    const lowerCaseQuery = query.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery),
    );
  }, [products, query]);

  const totalPages =
    perPage === PerPageType.ALL
      ? 0
      : Math.ceil(filteredProducts.length / Number(perPage));

  const visibleProducts = useMemo(() => {
    const sortedProducts = getSortedProducts(filteredProducts, sort);

    return getPaginatedProducts(sortedProducts, page, perPage);
  }, [sort, page, perPage, filteredProducts]);

  const getEmptyStateMessage = () => {
    switch (title) {
      case 'Mobile phones':
        return 'There are no phones yet';
      case 'Tablets':
        return 'There are no tablets yet';
      case 'Accessories':
        return 'There are no accessories yet';
      default:
        return 'There are no products yet';
    }
  };

  return (
    <section className={styles.catalog}>
      {isLoading && <Loader />}

      {errorMessage && (
        <div className={styles.error}>
          {errorMessage} <button onClick={onReload}>Retry</button>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <>
          <div className={styles.catalog__header}>
            <h1 className={styles.catalog__title}>{title}</h1>
            <span className={styles.catalog__count}>
              {filteredProducts.length} models
            </span>
          </div>

          {products.length === 0 ? (
            <div className={styles.catalog__empty}>
              <h2>{getEmptyStateMessage()}</h2>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.catalog__empty}>
              <h2>There are no products matching {query}</h2>
            </div>
          ) : (
            <>
              <div className={styles.catalog__controls}>
                <div className={styles.catalog__filter}>
                  <label htmlFor="sort-select">Sort by</label>
                  <select
                    name="sort-select"
                    id="sort-select"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="age">Newest</option>
                    <option value="title">Alphabetically</option>
                    <option value="price">Cheapest</option>
                  </select>
                </div>

                <div className={styles.catalog__filter}>
                  <label htmlFor="pagination-select">Items on page</label>
                  <select
                    name="pagination-select"
                    id="pagination-select"
                    value={perPage}
                    onChange={event => handlePerPageChange(event.target.value)}
                  >
                    <option value={PerPageType.FOUR}>4</option>
                    <option value={PerPageType.EIGHT}>8</option>
                    <option value={PerPageType.SIXTEEN}>16</option>
                    <option value={PerPageType.ALL}>All</option>
                  </select>
                </div>
              </div>

              <div className={styles.catalog__list}>
                <ProductsList products={visibleProducts} />
              </div>

              {totalPages > 1 && (
                <div className={styles.catalog__pagination}>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
