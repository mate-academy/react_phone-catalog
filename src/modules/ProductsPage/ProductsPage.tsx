/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useProductQueryParams } from 'shared/hooks/useProductQueryParams';

import { useProductsContext } from '../../contexts/ProductsContext';
import { NotFoundPage } from '../../modules/NotFoundPage';
import { EmptyState } from '../../shared/components/layout/EmptyState';
import { Error } from '../../shared/components/layout/Error';
import { Loader } from '../../shared/components/layout/Loader';
import { ProductCard } from '../../shared/components/layout/ProductCard';
import { Breadcrumbs } from '../../shared/components/ui/Breadcrumbs';
import {
  ItemsPerPage,
  itemsPerPage,
} from '../../shared/constants/paginationOptions';
import { ProductCategory } from '../../shared/constants/productCategory';
import { SortOptions, sortOptions } from '../../shared/constants/sortOptions';
import { capitalize } from '../../shared/helpers/capitalize';
import { useItemsPerPage } from '../../shared/hooks/useItemsPerPage';
import { usePagedProducts } from '../../shared/hooks/usePagedProducts';
import { useSortProducts } from '../../shared/hooks/useSortProducts';
import { useUpdateSearchParams } from '../../shared/hooks/useUpdateSearchParams';

import { Dropdown } from './components/Dropdown';
import { Pagination } from './components/Pagination';
import styles from './ProductsPage.module.scss';

type Params = {
  category: ProductCategory;
};

export const ProductsPage: React.FC = () => {
  const { category } = useParams<Params>();
  const {
    sortParam,
    itemsOnPageParam,
    currentPage,
    searchParams,
    setSearchParams,
  } = useProductQueryParams();

  const { productsByCategory, countsByCategory, loading, error } =
    useProductsContext();

  const isValidCategory =
    category && Object.values(ProductCategory).includes(category);
  const selectedCategory = category as ProductCategory;
  const products = isValidCategory
    ? productsByCategory[selectedCategory] || []
    : [];
  const isReady = isValidCategory && Array.isArray(products);
  const isAllSelected = itemsOnPageParam === ItemsPerPage.ALL;

  const sortedProducts = useSortProducts(products, sortParam);
  const perPage = useItemsPerPage(itemsOnPageParam, isAllSelected);
  const pagedProducts = usePagedProducts(
    currentPage,
    isAllSelected,
    sortedProducts,
    perPage,
  );

  const { updateParam, updatePage } = useUpdateSearchParams(
    searchParams,
    setSearchParams,
  );

  const handleSortBySelect = (value: string) => {
    updateParam('sort', value, SortOptions.NEWEST);
  };

  const handleItemsOnPageSelect = (value: string) => {
    updateParam('itemsOnPage', value, ItemsPerPage.ALL);
  };

  const handleChangePage = (page: number) => {
    updatePage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Error message={error} />;
  } else if (!isReady) {
    content = <NotFoundPage />;
  } else if (countsByCategory[selectedCategory] === 0) {
    content = <EmptyState category={selectedCategory} />;
  } else {
    content = (
      <>
        <Breadcrumbs />

        <h1 className={styles.categoryTitle}>{capitalize(selectedCategory)}</h1>

        <span className={styles.numOfProducts}>
          {`${countsByCategory[selectedCategory]} models`}
        </span>

        <div className={styles.productsControls}>
          <div className={styles.sortContainer}>
            <Dropdown
              label="Sort by"
              options={sortOptions}
              selectedOption={sortParam}
              onSelect={handleSortBySelect}
            />
          </div>

          <div className={styles.itemOnPageContainer}>
            <Dropdown
              label="Items on page"
              options={itemsPerPage}
              selectedOption={itemsOnPageParam}
              onSelect={handleItemsOnPageSelect}
            />
          </div>
        </div>

        <div className={styles.productsList}>
          {pagedProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} showDiscount={false} />
            </div>
          ))}
        </div>

        {!isAllSelected && (
          <Pagination
            curPage={currentPage}
            perPage={perPage}
            totalItems={countsByCategory[selectedCategory]}
            onPageChange={handleChangePage}
          />
        )}
      </>
    );
  }

  return <div className={styles.catalogPage}>{content}</div>;
};
