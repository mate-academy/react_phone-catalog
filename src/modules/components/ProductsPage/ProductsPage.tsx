/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */


//#region IMPORTS
import { useLocation, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';

import { CategoryType, PerPageType, SortType } from '../../shared/utils/types';
import { pageTitles } from '../../shared/utils/constants';

import { ProductPageFilters } from './components/ProductPageFilters';
import { ProductsList } from '../../shared/components/ProductsList';
import { Pagination } from './components/Pagination';

import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { Loader } from '@/modules/shared/components/Loader';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';

import styles from './ProductsPage.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  productsPage,
  productsPageTitle,
  productsPageCount,
  noProductsMessage,
} = styles;
//#endregion STYLES

export const ProductsPage = () => {
  //#region DATA_FETCHING
  const { pathname } = useLocation();
  const currentCategory = pathname.slice(1) as CategoryType;

  const { getProductsByCategory, isLoading, isError } = useProducts();
  const products = getProductsByCategory(currentCategory);

  const currentPageTitle = pageTitles[currentCategory];
  //#endregion DATA_FETCHING

  //#region URL_STATE
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortType) || SortType.Age;
  const perPage =
    (searchParams.get('perPage') as PerPageType) || PerPageType.All;
  const currentPage = Number(searchParams.get('page') || 1);
  const query = searchParams.get('query')?.toLowerCase() || '';
  //#endregion URL_STATE

  //#region HANDLERS
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(page));
    }

    setSearchParams(newParams);
  };
  //#endregion 

  //#region FILTERING_SORTING_&_PAGINATION
  const filteredProducts = useMemo(() => {
    if (!query) {
      return products;
    } else {
      return products.filter(p => p.name.toLowerCase().includes(query));
    }
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case SortType.Title:
          return a.name.localeCompare(b.name);
        case SortType.Price:
          return a.price - b.price;
        case SortType.Age:
        default:
          return b.year - a.year;
      }
    });
  }, [filteredProducts, sortBy]);

  const itemsPerPage =
    perPage === PerPageType.All ? sortedProducts.length : Number(perPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    if (perPage === PerPageType.All) {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, perPage, itemsPerPage]);
  //#endregion

  //#region RENDER_CONDITIONS
  const showEmptyCategory = products.length === 0;
  const showEmptySearch = !showEmptyCategory && filteredProducts.length === 0;
  const showProducts = filteredProducts.length > 0;
  const showPagination = perPage !== PerPageType.All && totalPages > 1;
  //#endregion

  //#region RENDER
  return (
    <div className={productsPage}>
      <Breadcrumbs pageTitle={currentPageTitle} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          <h1 className={productsPageTitle}>{currentPageTitle}</h1>
          <p className={productsPageCount}>{filteredProducts.length} models</p>

          {showEmptyCategory && (
            <p className={noProductsMessage}>
              There are no {currentCategory} yet
            </p>
          )}

          {showEmptySearch && (
            <p className={noProductsMessage}>
              There are no matching products...
            </p>
          )}

          {showProducts && (
            <>
              <ProductPageFilters />
              <ProductsList products={paginatedProducts} />

              {showPagination && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
  //#endregion
};
