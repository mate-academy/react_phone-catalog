import React, { useCallback, useMemo } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProducts } from '../../services';
import { Category, SearchParam, SortType, ThemeType } from '../../types';
import { useDebounce, useLoadData, useTheme } from '../../hooks';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_SORT_BY } from '../../constants';
import { PRODUCTS_PAGE_TITLES } from './constants';

import {
  Breadcrumbs,
  ProductsList,
  ProductsListSkeleton,
  InfoMessage,
  Pagination,
} from '../../components';
import { Filters } from './components';

import productNotFoundImgLight from '../../assets/product-not-found-light.png';
import productNotFoundImgDark from '../../assets/product-not-found-dark.png';
import comingSoonImgLight from '../../assets/coming-soon-light.png';
import comingSoonImgDark from '../../assets/coming-soon-dark.png';
import errorImgLight from '../../assets/loading-error-light.png';
import errorImgDark from '../../assets/loading-error-dark.png';

import styles from './ProductsPage.module.scss';

type Props = {
  productsCategory: Category;
};

export const ProductsPage: React.FC<Props> = ({ productsCategory }) => {
  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  const {
    data: allProducts,
    isLoading,
    isError,
    refetch,
  } = useLoadData(getProducts, [productsCategory]);

  const sortByParam = searchParams.get(SearchParam.SortBy) || DEFAULT_SORT_BY;
  const rawItemsPerPage = searchParams.get(SearchParam.ItemsPerPage);
  const itemsPerPageParam =
    rawItemsPerPage === 'all'
      ? 'all'
      : Number(rawItemsPerPage) <= 0 || isNaN(Number(rawItemsPerPage))
        ? Number(DEFAULT_ITEMS_PER_PAGE)
        : Number(rawItemsPerPage);
  const isShowAll = itemsPerPageParam === 'all';
  const query = searchParams.get(SearchParam.Query) || '';
  const debouncedQuery = useDebounce(query);
  const rawCurrentPage = +(searchParams.get(SearchParam.Page) || '1');
  const normalizedCurrentPage =
    isNaN(rawCurrentPage) || rawCurrentPage <= 0 ? 1 : rawCurrentPage;
  const title = PRODUCTS_PAGE_TITLES[productsCategory];
  const filteredProductsByCategory = useMemo(() => {
    return (
      allProducts?.filter(product => product.category === productsCategory) ||
      []
    );
  }, [allProducts, productsCategory]);

  const filteredProductsByQuery = useMemo(() => {
    return filteredProductsByCategory.filter(product =>
      product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [filteredProductsByCategory, debouncedQuery]);

  const sortedProducts = useMemo(() => {
    switch (sortByParam) {
      case SortType.Oldest:
        return [...filteredProductsByQuery].sort((a, b) => a.year - b.year);
      case SortType.Cheapest:
        return [...filteredProductsByQuery].sort((a, b) => a.price - b.price);
      case SortType.Expensive:
        return [...filteredProductsByQuery].sort((a, b) => b.price - a.price);
      default:
        return [...filteredProductsByQuery].sort((a, b) => b.year - a.year);
    }
  }, [filteredProductsByQuery, sortByParam]);

  const totalPages = isShowAll
    ? 1
    : Math.ceil(sortedProducts.length / (itemsPerPageParam as number));

  const currentPageIndex =
    isShowAll || totalPages <= 0
      ? 0
      : normalizedCurrentPage > totalPages
        ? totalPages - 1
        : normalizedCurrentPage - 1;

  const visibleProducts = useMemo(() => {
    if (isShowAll) {
      return sortedProducts;
    }

    const itemsPerPage = itemsPerPageParam as number;
    const startIndex = currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPageIndex, isShowAll, itemsPerPageParam]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams);

      if (page === 1) {
        newParams.delete(SearchParam.Page);
      } else {
        newParams.set(SearchParam.Page, page.toString());
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const clearQuery = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete(SearchParam.Query);
    setSearchParams(newParams);
  };

  const renderErrorMessage = () => (
    <InfoMessage
      title="There was an error loading the products"
      image={theme === ThemeType.Light ? errorImgLight : errorImgDark}
      buttonText="Retry"
      onButtonClick={refetch}
      className={styles['products-page__message']}
    />
  );

  const renderNoProducts = () => (
    <InfoMessage
      title={`There are no ${productsCategory} yet`}
      image={theme === ThemeType.Light ? comingSoonImgLight : comingSoonImgDark}
      buttonText="Back to homepage"
      buttonLink="/"
      className={styles['products-page__message']}
    />
  );

  const renderNoMatches = () => (
    <InfoMessage
      title={`There are no ${productsCategory} matching the query`}
      image={
        theme === ThemeType.Light
          ? productNotFoundImgLight
          : productNotFoundImgDark
      }
      buttonText="Clear search"
      onButtonClick={clearQuery}
      className={styles['products-page__message']}
    />
  );

  const renderProductList = () => (
    <ProductsList
      products={visibleProducts}
      className={styles['products-page__list']}
    />
  );

  const renderLoadingState = () => (
    <ProductsListSkeleton className={styles['products-page__list']} />
  );

  return (
    <>
      {productId ? (
        <Outlet />
      ) : (
        <main className={styles['products-page']}>
          <Breadcrumbs className={styles['products-page__breadcrumbs']} />
          <section className={styles['products-page__content']}>
            <h1 className={styles['products-page__title']}>{title}</h1>
            {isError ? (
              renderErrorMessage()
            ) : filteredProductsByCategory.length === 0 && !isLoading ? (
              renderNoProducts()
            ) : (
              <>
                <p
                  className={classNames(styles['products-page__amount'], {
                    [styles['products-page__amount--loading']]: isLoading,
                  })}
                >
                  {isLoading
                    ? ''
                    : `${filteredProductsByCategory.length} models`}
                </p>
                <Filters className={styles['products-page__filters']} />
                {isLoading
                  ? renderLoadingState()
                  : visibleProducts.length === 0
                    ? renderNoMatches()
                    : renderProductList()}
                {!isShowAll && !isLoading && totalPages > 1 && (
                  <Pagination
                    currentPage={currentPageIndex + 1}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </section>
        </main>
      )}
    </>
  );
};
