import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo, useRef } from 'react';

import styles from './ProductsPage.module.scss';

import { Product } from '@sTypes/Product';
import { ProductCategory } from '@sTypes/ProductCategory';
import { SORT_BY_DEFAULT, SORT_BY_NAME, SortBy } from './types/SortBy';

import {
  ItemsPerPage,
  ITEMS_PER_PAGE_NAME,
  ITEMS_PER_PAGE_DEFAULT,
} from './types/ItemsPerPage';

import { Error } from '@components/Error/Error';
import { Dropdown } from './components/Dropdown';

import { getSearchParam } from './utils/getSearchParam';
import { useProductsPreload } from '@hooks/useProductsPreload';
import { ProductsNavigation } from './components/ProductsNavigation';
import { ProductsList } from '@components/ProductsList';

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

  const sortedProducts = useMemo(() => {
    return sortProducts(categoryProducts, sort, SORT_BY_DEFAULT);
  }, [categoryProducts, sort]);

  const [page, itemsCount, pagesCount] = getPaginationData(
    params.get('page'),
    itemsPerPage,
    categoryProducts.length,
  );

  const optionsRef = useRef<HTMLDivElement | null>(null);

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
          {`${categoryProducts.length} model${categoryProducts.length === 1 ? '' : 's'}`}
        </div>
      </div>

      <main className={styles['products-page__main']}>
        <div ref={optionsRef} className={styles['products-page__options']}>
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

        {error && <Error error={error} reload={reload} />}

        {showContent && !hasContent && (
          <h3>There are no {category.toLowerCase()} yet.</h3>
        )}

        {!error && (isLoading || hasContent) && (
          <ProductsList
            isLoading={isLoading}
            products={sortedProducts}
            page={page}
            itemsCount={itemsCount}
            pagesCount={pagesCount}
            itemsPerPage={itemsPerPage}
          />
        )}

        {itemsPerPage !== ItemsPerPage.all && (
          <ProductsNavigation
            page={page}
            pagesCount={pagesCount}
            scrollToProducts={scrollToProducts}
          />
        )}
      </main>
    </div>
  );
};
