import React, { useMemo } from 'react';

import { CatalogProducts, PerPageType } from '../../types/Types';
import { Loader } from '../Loader';
import { ProductList } from '../ProductList';
import { Pagination } from '../Pagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { getPaginatedProducts, getSortedProducts } from '../../utils/helper';
import { Dropdown } from '../ui/Dropdown';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '../../constants';
import { Breadcrumbs } from '../Breadcrumbs';
import noProductsMatching from '../../../public/img/product-not-found.png';
import styles from './Catalog.module.scss';

const EMPTY_MESSAGES: Record<string, string> = {
  'Mobile phones': 'There are no phones yet',
  Tablets: 'There are no tablets yet',
  Accessories: 'There are no accessories yet',
};

interface CatalogProps {
  title: string;
  products: CatalogProducts[];
  errorMessage: string;
  isLoading: boolean;
  onReload: () => void;
  category?: string;
}

export const Catalog: React.FC<CatalogProps> = ({
  title,
  products,
  isLoading,
  errorMessage,
  onReload,
  category,
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

  const emptyStateMessage =
    EMPTY_MESSAGES[title] || 'There are no products yet';
  const noResultsMessage = `There are no ${title.toLowerCase()} matching ${query}`;

  return (
    <section className={styles.catalog}>
      {isLoading && <Loader />}

      {errorMessage && (
        <div className={styles.catalog__error}>
          {errorMessage}{' '}
          <button onClick={onReload} type="button">
            Retry
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && (
        <>
          <div className={styles.catalog__header}>
            {category && <Breadcrumbs category={category} />}
            <h1 className={styles.catalog__title}>{title}</h1>
            <span className={styles.catalog__count}>
              {filteredProducts.length} models
            </span>
          </div>

          {products.length === 0 ? (
            <div className={styles.catalog__empty}>
              <h2>{emptyStateMessage}</h2>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.catalog__emptyContent}>
              <h2 className={styles.catalog__emptyText}>{noResultsMessage}</h2>
              <img
                src={noProductsMatching}
                alt="No products matching"
                className={styles.catalog__emptyImage}
              />
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
                  label="Per page"
                  options={PER_PAGE_OPTIONS}
                  value={perPage.toString()}
                  onChange={handlePerPageChange}
                  className={styles.catalog__dropdown}
                />
              </div>

              <div className={styles.catalog__list}>
                <ProductList products={visibleProducts} />
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
