/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';

import { CategoryType, PerPageType, SortType } from '../../shared/utils/types';
import { getPageTitles } from '../../shared/utils/constants';

import { ProductPageFilters } from './components/ProductPageFilters';
import { ProductsList } from '../../shared/components/ProductsList';
import { Pagination } from './components/Pagination';

import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';

import { ProductCardSkeleton } from '@/modules/shared/components/ProductCard/ProductCardSkeleton';
import ProductsListStyles from '@/modules/shared/components/ProductsList/ProductsList.module.scss';

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
  //#region HOOKS
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProductsByCategory, isLoading, isError } = useProducts();
  //#endregion

  //#region URL_PARAMS
  const sortBy = (searchParams.get('sort') as SortType) || SortType.Age;
  const perPage =
    (searchParams.get('perPage') as PerPageType) || PerPageType.All;
  const currentPage = Number(searchParams.get('page') || 1);
  const query = searchParams.get('query')?.toLowerCase() || '';
  //#endregion

  //#region CATEGORY_DATA
  const currentCategory = pathname.slice(1) as CategoryType;
  const products = useMemo(
    () => getProductsByCategory(currentCategory),
    [currentCategory, getProductsByCategory],
  );

  const pageTitles = useMemo(() => getPageTitles(t), [t]);
  const currentPageTitle = pageTitles[currentCategory];
  //#endregion

  //#region DATA_PROCCESING
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

      <h1 className={productsPageTitle}>{currentPageTitle}</h1>
      <p className={productsPageCount}>
        {t('productsPage.count', { count: filteredProducts.length || 0 })}
      </p>

      {isError && <ErrorMessage />}

      {!isError && (
        <>
          {(!showEmptyCategory || isLoading) && <ProductPageFilters />}

          {isLoading ? (
            <div className={ProductsListStyles.productsList}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {showEmptyCategory && (
                <p className={noProductsMessage}>
                  {t('productsPage.message.noCategory', {
                    category: currentCategory,
                  })}
                </p>
              )}

              {showEmptySearch && (
                <p className={noProductsMessage}>
                  {t('productsPage.message.noProducts')}
                </p>
              )}

              {showProducts && (
                <>
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
        </>
      )}
    </div>
  );
  //#endregion
};
