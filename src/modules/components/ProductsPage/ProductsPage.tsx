/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */


//#region IMPORTS
import { useLocation, useSearchParams } from 'react-router-dom';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';

import { CategoryType, PerPageType, SortType } from '../../shared/utils/types';
import { pageTitles } from '../../shared/utils/constants';

import { ProductPageFilters } from './components/ProductPageFilters';
import { ProductsList } from './components/ProductsList';
import { Pagination } from './components/Pagination';

import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { Loader } from '@/modules/shared/components/Loader';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';

import styles from './ProductsPage.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  container,
  pageTitle,
  modelsCount,
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
  const perPage = (searchParams.get('perPage') as PerPageType) || PerPageType.All;
  const currentPage = Number(searchParams.get('page') || 1);
  //#endregion URL_STATE

  //#region HANDLERS
  const handlePageChange = (page: number) => {
    const newPage = new URLSearchParams(searchParams);
    newPage.set('page', String(page));
    setSearchParams(newPage);
  };
  //#endregion HANDLERS

  //#region SORTING
  const sortedProducts = [...products].sort((a, b) => {
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
  //#endregion SORING

  //#region PAGINATION
  const itemsPerPage = perPage === PerPageType.All ? sortedProducts.length : Number(perPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts =
    perPage === PerPageType.All
      ? sortedProducts
      : sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage,
      );

  const showPagination = perPage !== PerPageType.All && totalPages > 1;
  //#endregion PAGINATION

  //#region RENDER
  return (
    <div className={container}>
      <Breadcrumbs pageTitle={currentPageTitle} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          <h1 className={pageTitle}>{currentPageTitle}</h1>
          <p className={modelsCount}>{products.length} models</p>

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
    </div>
  );
  //#endregion RENDER
};
