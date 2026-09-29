import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProducts } from '@/shared/context/ProductsContext';

import { SORT_BY } from '@/shared/types';
import {
  PER_PAGE_PARAM,
  processProducts,
  SORT_PARAM,
  PAGE_PARAM,
  getSortByFromSearchParams,
  getPerPageFromSearchParams,
  getPageFromSearchParams,
  VALID_CATEGORIES,
  CATEGORY_TITLES,
  SORT_OPTIONS,
} from '@/utils';
import { AsyncData } from '@/shared/components/AsyncData';

import { BreadcrumbsNav } from '@/shared/components/BreadcrumbsNav';
import { CatalogHeader } from '@/shared/components/CatalogHeader';
import { ProductsList } from '@/shared/components/ProductsList/ProductsList';
import { NotFoundPage } from '../NotFoundPage';
import {
  DropdownSelect,
  DropdownSelectSkeleton,
} from '@/shared/components/DropdownSelect';
import {
  Pagination,
  PER_PAGE_ALL,
  DEFAULT_PAGE,
  PER_PAGE_OPTIONS,
} from '@/shared/components/Pagination';

import './CatalogPage.scss';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, hasError, loadData } = useProducts();

  const isCategoryValid =
    category &&
    VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number]);

  //#region Url params
  const query = searchParams.get('query') || '';
  const perPageStr = getPerPageFromSearchParams(searchParams);
  const currentPage = getPageFromSearchParams(searchParams);
  const sortBy = getSortByFromSearchParams(searchParams);
  //#endregion Url params

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === category);
  }, [products, category]);

  const categoryTitle =
    category && category in CATEGORY_TITLES
      ? CATEGORY_TITLES[category as keyof typeof CATEGORY_TITLES]
      : '';
  // sort - search - pagination
  const { totalCount, processedProducts } = useMemo(() => {
    return processProducts(categoryProducts, {
      query,
      sortBy,
      page: currentPage,
      perPage: perPageStr === PER_PAGE_ALL ? PER_PAGE_ALL : Number(perPageStr),
    });
  }, [query, perPageStr, currentPage, categoryProducts, sortBy]);

  const perPageNum =
    perPageStr === PER_PAGE_ALL ? totalCount : Number(perPageStr);

  //#region handles (updating Urls)
  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  const handlePerPageChange = (value: string) => {
    updateUrlParams({
      [PER_PAGE_PARAM]: value === PER_PAGE_ALL ? null : value,
      [PAGE_PARAM]: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({
      [PAGE_PARAM]: page === DEFAULT_PAGE ? null : String(page),
    });
  };

  const handleSortChange = (value: string) => {
    updateUrlParams({
      [SORT_PARAM]: value === SORT_BY.AGE ? null : value,
      [PAGE_PARAM]: null,
    });
  };
  //#endregion handles (updating Urls)

  if (!isCategoryValid) {
    return <NotFoundPage />;
  }

  return (
    <div className="catalog-page container">
      <div className="catalog-page__top-bar">
        <BreadcrumbsNav isLoading={isLoading} />
        <ThemeToggle className="catalog-page__theme-btn" />
      </div>
      <CatalogHeader catalogName={categoryTitle} countProduct={totalCount} />

      <AsyncData hasError={hasError} onRetry={loadData}>
        <div className="catalog-page__controls">
          {isLoading ? (
            <>
              <DropdownSelectSkeleton />
              <DropdownSelectSkeleton />
            </>
          ) : (
            <>
              <DropdownSelect
                label="Sort by"
                value={sortBy}
                options={SORT_OPTIONS}
                onChange={handleSortChange}
              />
              <DropdownSelect
                label="Items on page"
                value={perPageStr}
                options={PER_PAGE_OPTIONS}
                onChange={handlePerPageChange}
                className="catalog-page__select-page"
              />
            </>
          )}
        </div>

        {processedProducts.length === 0 && !isLoading && (
          <span className="catalog-page__text-info">
            There are no products available
          </span>
        )}
        <ProductsList products={processedProducts} isLoading={isLoading} />

        <div className="catalog-page__pagination">
          {perPageStr !== PER_PAGE_ALL && (
            <Pagination
              total={totalCount}
              perPage={perPageNum}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </AsyncData>
    </div>
  );
};
