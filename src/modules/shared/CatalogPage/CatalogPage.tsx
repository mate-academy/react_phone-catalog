import styles from './CatalogPage.module.scss';
import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Loader } from '../Loader/Loader';
import { ErrorState } from '../ErrorState/ErrorState';
import { Dropdown } from '../Dropdown/Dropdown';
import { ProductsList } from '../ProductsList/ProductsList';
import { Pagination } from '../Pagination/Pagination';
import { useCatalog } from '../../../hooks/useCatalog';

type Props = {
  category: string;
  title: string;
  emptyMessage: string;
};

export const CatalogPage: React.FC<Props> = ({
  category,
  title,
  emptyMessage,
}) => {
  const {
    products,
    loading,
    error,
    loadProducts,
    sortBy,
    perPage,
    perPageNum,
    currentPage,
    query,
    filteredProducts,
    visibleProducts,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  } = useCatalog(category);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: title }]} />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.count}>{products.length} models</p>

      <div className={styles.dropdowns}>
        <Dropdown
          label="Sort by"
          value={sortBy}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'alphabetically', label: 'Alphabetically' },
            { value: 'cheapest', label: 'Cheapest' },
          ]}
          onChange={handleSortChange}
        />

        <Dropdown
          label="Items on page"
          value={perPage}
          options={[
            { value: '4', label: '4' },
            { value: '8', label: '8' },
            { value: '16', label: '16' },
            { value: 'all', label: 'all' },
          ]}
          onChange={handlePerPageChange}
        />
      </div>

      {loading && <Loader />}

      {!loading && error && <ErrorState onRetry={loadProducts} />}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className={styles.emptyMessage}>
          {query ? `There are no phones matching "${query}"` : emptyMessage}
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && filteredProducts.length > 0 && (
            <Pagination
              totalItems={filteredProducts.length}
              perPage={perPageNum}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
