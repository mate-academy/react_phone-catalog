import React from 'react';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductsList } from '../PhonesPage/components/ProductsList/ProductsList';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { usePaginationAndSorting } from '../../hooks/paginationAndSorting/usePaginationAndSorting';
import { useFetchProducts } from '../../hooks/fetchProducts/useFetchProducts';

export const PhonesPage: React.FC = () => {
  const { products, loading, error } = useFetchProducts('phones');
  const {
    sort,
    totalPages,
    currentPage,
    itemsPerPage,
    paginatedProducts,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
  } = usePaginationAndSorting(products);

  return (
    <div className="phones-page">
      <h1>Phones Page</h1>

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

          <ProductsList products={paginatedProducts} />

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

export default PhonesPage;
