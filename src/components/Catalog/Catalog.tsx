import React, { useMemo } from 'react';

import { CatalogProducts, PerPageType } from '../../types/Types';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { getPaginatedProducts, getSortedProducts } from '../../utils/helpers';
import { Dropdown } from '../ui/Dropdown';
import styles from './Catalog.module.scss';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '../../constants';

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
          {errorMessage}{' '}
          <button onClick={onReload} type="button">
            Retry
          </button>
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
                <Dropdown
                  label="Sort by"
                  options={SORT_OPTIONS}
                  value={sort}
                  onChange={handleSortChange}
                  className={styles.catalog__dropdown}
                />

                <Dropdown
                  label="Items on page"
                  options={PER_PAGE_OPTIONS}
                  value={perPage.toString()}
                  onChange={handlePerPageChange}
                  className={styles.catalog__dropdown}
                />
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
