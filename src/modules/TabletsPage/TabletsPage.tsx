import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductsList } from '../PhonesPage/components/ProductsList/ProductsList';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { useFetchProducts } from '../../hooks/fetchProducts/useFetchProducts';
import { usePaginationAndSorting } from '../../hooks/paginationAndSorting/usePaginationAndSorting';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { debounce } from 'lodash';
import styles from './TabletsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const TabletsPage: React.FC = () => {
  const { products, loading, error } = useFetchProducts('tablets');
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

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const debouncedSetParams = useCallback(
    debounce((newParams: URLSearchParams) => {
      setSearchParams(newParams);
    }, 500),
    [setSearchParams]
  );

  useEffect(() => {
    return () => {
      debouncedSetParams.cancel();
    };
  }, [debouncedSetParams]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      const newParams = new URLSearchParams(searchParams.toString());
      if (value) {
        newParams.set('query', value);
      } else {
        newParams.delete('query');
      }
      debouncedSetParams(newParams);
    },
    [searchParams, debouncedSetParams]
  );

  const filteredProducts = paginatedProducts.filter(product =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={styles.tabletsPage}>
      <Breadcrumbs categor='Tablets' productDescription={[]} />
      <h1>Tablets Page</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && products.length === 0 && (
        <div>На даний момент немає планшетів.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <Search value={inputValue} onChange={handleSearchChange} />

          <ProductFilter
            sort={sort}
            itemsPerPage={itemsPerPage}
            onSortChange={handleSortChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          <ProductsList products={filteredProducts} />

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

export default TabletsPage;

