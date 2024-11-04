import React from 'react';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination/Pagination';
import { AccessoriesList } from '../AccessoriesPage/components/AccessoriesList';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { usePaginationAndSorting } from '../../hooks/paginationAndSorting/usePaginationAndSorting';
import { useFetchProducts } from '../../hooks/fetchProducts/useFetchProducts';

export const AccessoriesPage: React.FC = () => {
  const { products, loading, error } = useFetchProducts('accessories');
  const {
    sort,
    totalPages,
    currentPage,
    itemsPerPage,
    paginatedProducts,
    handlePageChange,
    handleSortChange,
    handleItemsPerPageChange,
  } = usePaginationAndSorting(products);

  return (
    <div className="accessories-page">
      <h1>Accessories page</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && products.length === 0 && (
        <div>There are no phones yet.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <ProductFilter
            sort={sort}
            itemsPerPage={itemsPerPage}
            onSortChange={handleSortChange}
            onItemsPerPageChange={handleItemsPerPageChange}/>

          <AccessoriesList products={paginatedProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AccessoriesPage;
