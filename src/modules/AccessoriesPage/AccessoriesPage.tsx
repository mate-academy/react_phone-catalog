/* eslint-disable  react-hooks/exhaustive-deps */
/* eslint-disable  max-len */

import React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Pagination } from '../../components/Pagination/Pagination';
import { AccessoriesList } from '../AccessoriesPage/components/AccessoriesList';
import { ProductFilter } from '../../components/ProductFilter/ProductFilter';
import { usePaginationAndSorting } from '../../hooks/paginationAndSorting/usePaginationAndSorting';
import { useFetchProducts } from '../../hooks/fetchProducts/useFetchProducts';
import styles from './AccessoriesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Search } from '../../components/Search/Search';

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
    [setSearchParams],
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

      newParams.set('page', '1');
      debouncedSetParams(newParams)

      debouncedSetParams(newParams);
    },
    [searchParams, debouncedSetParams],
  );

  const filteredProducts = paginatedProducts.filter(product =>
    product.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className={styles.accessoriesPage}>
      <Breadcrumbs categor="Accessories" productDescription={[]} />
      <h1>Accessories page</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && products.length === 0 && (
        <div>There are no phones yet.</div>
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

          <AccessoriesList products={filteredProducts} />

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
