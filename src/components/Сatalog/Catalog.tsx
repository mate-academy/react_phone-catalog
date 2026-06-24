import { Product, ProductType } from '../../shared/types';
import { useCallback, useEffect, useState } from 'react';
import * as productService from '../../api/product';
import catalogStyles from './Catalog.module.scss';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchWith';
import classNames from 'classnames';
import { ArrowDirection, IconArrow } from '../../shared/IconArrow';
import { SecondaryButton } from '../SecondaryButton';
import { SomethingWentWrongError } from '../SomethingWentWrongError';
import { Breadcrumbs } from '../Breadcrumbs';

type Props = {
  category: ProductType;
};

type SortType = 'age' | 'price' | 'title';
type PageSizeType = '4' | '8' | '16' | 'all';

const CatalogInfo = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortOptions = {
  Newest: 'age',
  Alphabetically: 'title',
  Cheapest: 'price',
};

const pageSizeOptions = {
  4: 4,
  8: 8,
  16: 16,
  All: 'all',
};

type Params = {
  [key: string]: string | null;
};

const sortProducts = (products: Product[], sort: SortType) => {
  const productsCopy = [...products];
  let callback = (a: Product, b: Product) => b.year - a.year;

  if (sort === 'price') {
    callback = (a, b) => a.price - b.price;
  }

  if (sort === 'title') {
    return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
  }

  return productsCopy.sort(callback);
};

const normalizeSortType = (sort: string): SortType => {
  return sort === 'price' || sort === 'title' ? sort : 'age';
};

const normalizePageSize = (pageSize: string): PageSizeType => {
  return pageSize === '4' || pageSize === '8' || pageSize === '16'
    ? pageSize
    : 'all';
};

const getTotalPages = (productsLength: number, pageSize: string) => {
  if (pageSize === 'all') {
    return 1;
  }

  return Math.ceil(productsLength / +pageSize);
};

const getPages = (
  totalPages: number,
  currentPage: number,
  visible: number = 4,
) => {
  let start = currentPage;
  let end = start + visible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visible + 1);
  }

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return {
    pages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};

export const Catalog = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  const sortParam = searchParams.get('sort') || 'age';
  const page = searchParams.get('page') || '1';
  const pageSizeParam = searchParams.get('pageSize') || 'all';

  const sort: SortType = normalizeSortType(sortParam);
  const pageSize: PageSizeType = normalizePageSize(pageSizeParam);
  const totalPages = getTotalPages(products.length, pageSizeParam);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setErrorMessage('');

    productService
      .getProductsByCategory(category)
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        setErrorMessage(
          `Failed to fetch ${category} products. Please try again later.`,
        );
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSortChange = (newSortParam: string) => {
    setSearchWith({ sort: newSortParam, page: '1' });
  };

  const handlePageSizeChange = (newPageSizeParam: string) => {
    setSearchWith({ pageSize: newPageSizeParam, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    const safePage = Math.max(1, Math.min(totalPages, newPage));

    setSearchWith({ page: safePage.toString() });
  };

  const handlePrev = () => handlePageChange(+page - 1);
  const handleNext = () => handlePageChange(+page + 1);

  const itemsStart = pageSize === 'all' ? 0 : (+page - 1) * +pageSizeParam;

  const itemsEnd =
    pageSize === 'all'
      ? products.length
      : +page * +pageSizeParam > products.length
        ? products.length
        : +page * +pageSizeParam;

  const shownProducts = sortProducts(products, sort).slice(
    itemsStart,
    itemsEnd,
  );

  const navData = getPages(totalPages, +page);
  const hasNoProducts = !isLoading && products.length === 0;

  return (
    <>
      {errorMessage && (
        <SomethingWentWrongError
          errorMessage={errorMessage}
          actionText="Reload"
          onAction={loadProducts}
        />
      )}
      {!errorMessage && (
        <div className={classNames(catalogStyles.Catalog, 'container')}>
          <Breadcrumbs
            items={[
              {
                title: category[0].toUpperCase() + category.slice(1),
              },
            ]}
          />
          <h1 className={classNames('font-h1', catalogStyles.CatalogTitle)}>
            {CatalogInfo[category]}
          </h1>
          <p className={classNames('font-body', catalogStyles.CatalogCounter)}>
            {isLoading
              ? 'Loading data, please wait'
              : `${products.length} models`}
          </p>
          <div className={catalogStyles.CatalogControls}>
            <label
              className={classNames('font-small', catalogStyles.CatalogLabel)}
            >
              Sort by
              <div className={catalogStyles.CatalogSelectWrapper}>
                <select
                  id="sortSelect"
                  defaultValue={sort}
                  onChange={e => handleSortChange(e.target.value)}
                  className={classNames(
                    'font-buttons',
                    catalogStyles.CatalogSelect,
                    catalogStyles.CatalogSelectSorting,
                  )}
                >
                  {Object.entries(sortOptions).map(([key, value]) => (
                    <option
                      key={key}
                      value={value}
                      onSelect={() => handleSortChange(value)}
                    >
                      {key}
                    </option>
                  ))}
                </select>
                <span className={catalogStyles.CatalogSelectArrow}>
                  <IconArrow direction={ArrowDirection.Down} />
                </span>
              </div>
            </label>
            <label
              className={classNames('font-small', catalogStyles.CatalogLabel)}
            >
              Items on page
              <div className={catalogStyles.CatalogSelectWrapper}>
                <select
                  defaultValue={pageSize}
                  onChange={e => handlePageSizeChange(e.target.value)}
                  className={classNames(
                    'font-buttons',
                    catalogStyles.CatalogSelect,
                  )}
                >
                  {Object.entries(pageSizeOptions).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
                <span className={catalogStyles.CatalogSelectArrow}>
                  <IconArrow direction={ArrowDirection.Down} />
                </span>
              </div>
            </label>
          </div>
          {hasNoProducts && (
            <p
              className={classNames(
                'font-h2',
                catalogStyles.CatalogEmptyMessage,
              )}
            >
              {`There are no ${category} yet`}
            </p>
          )}

          {!hasNoProducts && (
            <section className={catalogStyles.CatalogGrid}>
              {isLoading &&
                Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className={catalogStyles.CatalogSkeletonItem}
                  >
                    <ProductCardSkeleton />
                  </div>
                ))}

              {!isLoading &&
                shownProducts.map(product => (
                  <div className={catalogStyles.CatalogItem} key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </section>
          )}

          <div className={catalogStyles.CatalogNavigationButtons}>
            {totalPages > 1 && (
              <SecondaryButton
                isDisabled={!navData.hasPrev}
                onClick={handlePrev}
              >
                <IconArrow direction="Left"></IconArrow>
              </SecondaryButton>
            )}
            {totalPages > 1 &&
              navData.pages.map(pageNumber => (
                <SecondaryButton
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  isSelected={pageNumber === +page}
                >
                  {pageNumber}
                </SecondaryButton>
              ))}
            {totalPages > 1 && (
              <SecondaryButton
                isDisabled={!navData.hasNext}
                onClick={handleNext}
              >
                <IconArrow direction="Right"></IconArrow>
              </SecondaryButton>
            )}
          </div>
        </div>
      )}
    </>
  );
};
