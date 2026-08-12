import { useMemo } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { PageMessage } from '../../components/PageMessage';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { useCatalogPage, useTranslation } from '../../hooks';
import type { ProductCategory } from '../../types/product';
import styles from './CatalogPage.module.scss';

type Props = {
  category: ProductCategory;
  title: string;
};

export const CatalogPage = ({ category }: Props) => {
  const t = useTranslation();

  const {
    isLoading,
    hasError,
    sortBy,
    perPage,
    safeCurrentPage,
    totalPages,
    categoryProducts,
    searchedProducts,
    visibleProducts,
    shouldShowPagination,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = useCatalogPage(category);

  const latestProductYear = useMemo(() => {
    if (categoryProducts.length === 0) {
      return 0;
    }

    return Math.max(...categoryProducts.map(product => product.year));
  }, [categoryProducts]);

  const title = useMemo(() => {
    switch (category) {
      case 'phones':
        return t.catalog.phonesTitle;

      case 'tablets':
        return t.catalog.tabletsTitle;

      case 'accessories':
        return t.catalog.accessoriesTitle;

      default:
        return '';
    }
  }, [category, t]);

  const sortOptions = useMemo(
    () => [
      { value: 'age', label: t.catalog.newest },
      { value: 'name', label: t.catalog.alphabetically },
      { value: 'price', label: t.catalog.cheapest },
    ],
    [t],
  );

  const perPageOptions = useMemo(
    () => [
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
      { value: 'all', label: t.catalog.all },
    ],
    [t],
  );

  const emptyMessage = useMemo(() => {
    switch (category) {
      case 'phones':
        return t.catalog.noPhones;

      case 'tablets':
        return t.catalog.noTablets;

      case 'accessories':
        return t.catalog.noAccessories;

      default:
        return t.catalog.noProducts;
    }
  }, [category, t]);

  const searchEmptyMessage = useMemo(() => {
    switch (category) {
      case 'phones':
        return t.catalog.noPhonesQuery;

      case 'tablets':
        return t.catalog.noTabletsQuery;

      case 'accessories':
        return t.catalog.noAccessoriesQuery;

      default:
        return t.catalog.noProductsQuery;
    }
  }, [category, t]);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: title,
          },
        ]}
      />

      <h1 className={styles.title}>{title}</h1>

      {isLoading && (
        <div className={styles.grid} aria-busy="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && hasError && (
        <PageMessage
          title={t.common.somethingWentWrong}
          text={t.catalog.loadProductsError}
          actionText={t.common.reload}
          onAction={() => window.location.reload()}
        />
      )}

      {!isLoading && !hasError && categoryProducts.length === 0 && (
        <PageMessage title={emptyMessage} text={t.catalog.checkLater} />
      )}

      {!isLoading && !hasError && categoryProducts.length > 0 && (
        <>
          <p className={styles.count}>
            {searchedProducts.length}{' '}
            {searchedProducts.length === 1 ? t.catalog.model : t.catalog.models}
          </p>

          <div className={styles.controls}>
            <Dropdown
              className={styles.sortDropdown}
              label={t.catalog.sortBy}
              value={sortBy}
              options={sortOptions}
              onChange={handleSortChange}
            />

            <Dropdown
              className={styles.perPageDropdown}
              label={t.catalog.itemsOnPage}
              value={perPage}
              options={perPageOptions}
              onChange={handlePerPageChange}
            />
          </div>

          {searchedProducts.length === 0 ? (
            <PageMessage
              title={searchEmptyMessage}
              text={t.catalog.tryAnotherSearch}
            />
          ) : (
            <div className={styles.grid}>
              {visibleProducts.map(product => (
                <ProductCard
                  product={product}
                  isBrandNew={product.year === latestProductYear}
                  key={product.itemId}
                />
              ))}
            </div>
          )}

          {shouldShowPagination && (
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
