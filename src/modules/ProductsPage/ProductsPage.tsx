import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './ProductsPage.module.scss';

import { Product } from '@sTypes/Product';
import { ArrowType } from '@sTypes/ArrowType';
import { ProductCategory } from '@sTypes/ProductCategory';
import { SORT_BY_DEFAULT, SORT_BY_NAME, SortBy } from './types/SortBy';

import {
  ItemsPerPage,
  ITEMS_PER_PAGE_NAME,
  ITEMS_PER_PAGE_DEFAULT,
} from './types/ItemsPerPage';

import { Arrow } from '@components/Arrow';
import { Dropdown } from './components/Dropdown';
import { SearchLink } from './components/SearchLink';
import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import { getSearchParam } from './utils/getSearchParam';
import { useProductsPreload } from '@hooks/useProductsPreload';

const MAX_VISIBLE_PAGES = 5;
const VISIBLE_COUNT_PAGINATION = 16;

function getVisiblePageRange(pagesCount: number, currentPage: number) {
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);

  let start = Math.max(currentPage - half, 0);
  const end = Math.min(start + MAX_VISIBLE_PAGES, pagesCount);

  if (end - start < MAX_VISIBLE_PAGES && start > 0) {
    start = Math.max(end - MAX_VISIBLE_PAGES, 0);
  }

  return { start, end };
}

function getCurrentPage(initialPage: string | null) {
  const page = +(initialPage || 1);

  return Object.is(page, NaN) ? 1 : page - 1;
}

function sortProducts(products: Product[], sort: SortBy, defaultSort: SortBy) {
  if (sort === defaultSort) {
    return products;
  }

  switch (sort) {
    case SortBy.age:
      return [...products].sort(
        (productA, productB) => productA.age - productB.age,
      );

    case SortBy.title:
      return [...products].sort((productA, productB) =>
        productA.name.localeCompare(productB.name),
      );

    case SortBy.price:
      return [...products].sort(
        (productA, productB) => productA.price - productB.price,
      );
  }
}

function getPaginationData(
  initialPage: string | null,
  itemsPerPage: ItemsPerPage,
  length: number,
): [number, number, number] {
  if (itemsPerPage === ItemsPerPage.all) {
    return [0, length, 0];
  }

  const page = getCurrentPage(initialPage);
  const pagesCount = Math.ceil(length / +itemsPerPage);

  return [page, +itemsPerPage, pagesCount];
}

export const ProductsPage = () => {
  const { pathname } = useLocation();

  const [params] = useSearchParams();
  const { products, isLoading, error, reload } = useProductsPreload();

  const category = pathname.split('/').at(-1) as ProductCategory;

  const categoryProducts = products[category] as Product[];
  const title = category[0].toUpperCase() + category.slice(1);

  // #region get searchParams and pagination data
  const sort = getSearchParam(
    SORT_BY_NAME,
    params,
    Object.entries(SortBy),
    SORT_BY_DEFAULT,
  ) as SortBy;

  const itemsPerPage = getSearchParam(
    ITEMS_PER_PAGE_NAME,
    params,
    Object.values(ItemsPerPage).map(value => [value, value]),
    ITEMS_PER_PAGE_DEFAULT,
  ) as ItemsPerPage;
  // #endregion

  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT_PAGINATION);

  const sortedProducts = useMemo(() => {
    setVisibleCount(VISIBLE_COUNT_PAGINATION);

    return sortProducts(categoryProducts, sort, SORT_BY_DEFAULT);
  }, [categoryProducts, sort]);

  const [page, itemsCount, pagesCount] = getPaginationData(
    params.get('page'),
    itemsPerPage,
    categoryProducts.length,
  );

  const { start, end } = getVisiblePageRange(pagesCount, page);

  useEffect(() => {
    setVisibleCount(VISIBLE_COUNT_PAGINATION);
  }, [itemsPerPage]);

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  const scrollToProducts = useCallback(() => {
    const headerHeight = (window.innerWidth < 640 ? 48 : 64) + 10;

    if (optionsRef.current) {
      const elementPosition = optionsRef.current.offsetTop;

      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const handleGlobalScroll = () => {
      if (productsRef.current) {
        const element = productsRef.current;
        const currentScroll = window.scrollY + window.innerHeight;
        const maxScroll = element.offsetTop + element.offsetHeight * 0.9;

        if (currentScroll >= maxScroll) {
          setVisibleCount(prev => prev + VISIBLE_COUNT_PAGINATION);
        }
      }
    };

    if (
      itemsPerPage === ItemsPerPage.all &&
      visibleCount <= sortedProducts.length
    ) {
      document.addEventListener('scroll', handleGlobalScroll);
    }

    return () => document.removeEventListener('scroll', handleGlobalScroll);
  }, [itemsPerPage, sortedProducts.length, visibleCount]);

  const showContent = !isLoading && !error;
  const hasContent = sortedProducts.length !== 0;

  return (
    <div className={styles['products-page']}>
      <div className={styles['products-page__header']}>
        <h1>{title}</h1>

        <div
          className={classNames(styles['products-page__model-count'], {
            [styles['products-page__model-count--loading']]: isLoading,
          })}
        >
          {categoryProducts.length} model
          {categoryProducts.length === 1 ? '' : 's'}
        </div>
      </div>

      <div ref={optionsRef} className={styles['products-page__content']}>
        <div className={styles['products-page__options']}>
          <Dropdown
            name={SORT_BY_NAME}
            description="Sort by"
            options={Object.entries(SortBy)}
            defaultValue={SORT_BY_DEFAULT}
            reset={['page']}
          />

          <Dropdown
            name={ITEMS_PER_PAGE_NAME}
            description="Items on page"
            options={Object.values(ItemsPerPage).map(value => [value, value])}
            defaultValue={ITEMS_PER_PAGE_DEFAULT}
            reset={['page']}
          />
        </div>
      </div>

      {error && (
        <h3 className={styles['products-page__message']}>
          {'Something went wrong!'}

          <div
            className={styles['products-page__message-icon']}
            onClick={() => reload()}
          >
            ⟳
          </div>
        </h3>
      )}

      {showContent && !hasContent && (
        <h3 className={styles['products-page__message']}>
          There are no {category.toLowerCase()} yet.
        </h3>
      )}

      {!error && (isLoading || hasContent) && (
        <div
          ref={!isLoading ? productsRef : null}
          className={styles['products-page__products']}
        >
          {isLoading &&
            Array.from({ length: itemsCount || 16 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}

          {!isLoading &&
            sortedProducts
              .slice(
                page * itemsCount,
                (page + 1) * (pagesCount !== 0 ? itemsCount : visibleCount),
              )
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}

      {showContent && itemsPerPage !== ItemsPerPage.all && (
        <div className={styles['products-page__navigation']}>
          <SearchLink
            style={!page ? { pointerEvents: 'none' } : undefined}
            params={{ page: page !== 1 ? `${page}` : null }}
            onClick={page ? () => scrollToProducts() : undefined}
          >
            <Arrow type={ArrowType.left} disabled={!page} />
          </SearchLink>

          <div className={styles['products-page__pages']}>
            {Array.from({ length: end - start }, (_, i) => {
              const index = start + i;

              return (
                <SearchLink
                  key={index}
                  params={{ page: index ? `${index + 1}` : null }}
                  className={classNames(styles['products-page__page'], {
                    [styles['products-page__page--active']]: index === page,
                  })}
                  onClick={() => scrollToProducts()}
                >
                  {index + 1}
                </SearchLink>
              );
            })}
          </div>

          <SearchLink
            style={
              page === pagesCount - 1 ? { pointerEvents: 'none' } : undefined
            }
            params={{ page: `${page + 2}` }}
            onClick={() => scrollToProducts()}
          >
            <Arrow type={ArrowType.right} disabled={page === pagesCount - 1} />
          </SearchLink>
        </div>
      )}
    </div>
  );
};
