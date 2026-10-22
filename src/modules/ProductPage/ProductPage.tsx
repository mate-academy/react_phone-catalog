import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductList } from './components/ProductList/';
import { DropdownSelect } from './components/DropdownSelect';
import { Loader } from '../shared/components/Loader';
import { ProductsTotal } from './components/ProductsTotal';
import { ErrorLoading } from './components/ErrorLoading';
import { EmptyList } from './components/EmptyList';
import { getProductsByCategory } from '../../services/services';
import styles from './ProductPage.module.scss';
import type { Product } from '../../types/Product';
import { SearchField } from './components/SearchField';
import { Pagination } from './components/Pagination';
import {
  SORT_OPTIONS,
  SORT_OPTIONS_MAP,
  PER_PAGE_OPTIONS,
  PER_PAGE_OPTIONS_MAP,
  CATEGORY_TITLES,
} from '../../constants';
import type { ProductCategories } from '../../types/ProductCategories';
import { updateSearchParams } from '../../helper';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || SORT_OPTIONS_MAP.Newest;
  const searchBy = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const currentPage = pageParam ? Number(pageParam) : 1;
  const perPage = perPageParam || PER_PAGE_OPTIONS_MAP.lg;

  const { category } = useParams<{ category: string }>();
  const isValidCategory = Boolean(category && category in CATEGORY_TITLES);
  const currentCategory = category as ProductCategories;
  const title = isValidCategory ? CATEGORY_TITLES[currentCategory] : '';

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(currentCategory)
      .then(data => setProducts(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [currentCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSortChange = (newSortBy: string | number) => {
    updateSearchParams(
      'sort',
      newSortBy,
      searchParams,
      setSearchParams,
      SORT_OPTIONS_MAP.Newest,
    );
  };

  const handlePerPageChange = (newPerPage: string | number) => {
    updateSearchParams(
      'perPage',
      newPerPage,
      searchParams,
      setSearchParams,
      PER_PAGE_OPTIONS_MAP.lg,
    );
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams('page', newPage, searchParams, setSearchParams, 1);
  };

  const visibleProducts = useMemo(() => {
    const productsCopy = [...products];

    switch (sortBy) {
      case SORT_OPTIONS_MAP.Newest:
        productsCopy.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case SORT_OPTIONS_MAP.Alphabetical:
        productsCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SORT_OPTIONS_MAP.Cheapest:
        productsCopy.sort(
          (a, b) => (a.priceDiscount ?? 0) - (b.priceDiscount ?? 0),
        );
        break;
      case SORT_OPTIONS_MAP.MostExpensive:
        productsCopy.sort(
          (a, b) => (b.priceDiscount ?? 0) - (a.priceDiscount ?? 0),
        );
        break;
      default:
        break;
    }

    return productsCopy.filter(product =>
      product.name.toLowerCase().includes(searchBy.toLowerCase()),
    );
  }, [products, sortBy, searchBy]);

  const productsTotal = visibleProducts.length;

  const { paginatedProducts, totalPages, safeCurrentPage } = useMemo(() => {
    let paginated = visibleProducts;
    let total = 1;
    let safePage = currentPage;

    if (perPage !== 'all') {
      const perPageNum = Number(perPage);

      total = Math.ceil(visibleProducts.length / perPageNum) || 1;

      safePage = Math.min(currentPage, total);
      if (safePage < 1) {
        safePage = 1;
      }

      const startIndex = (safePage - 1) * perPageNum;

      paginated = visibleProducts.slice(startIndex, startIndex + perPageNum);
    }

    return {
      paginatedProducts: paginated,
      totalPages: total,
      safeCurrentPage: safePage,
    };
  }, [visibleProducts, perPage, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <ErrorLoading reloadAction={loadProducts} />;
  }

  if (products.length === 0) {
    return <EmptyList category={currentCategory} />;
  }

  return (
    <>
      <Breadcrumbs />

      <h1 className={styles.title}>{title}</h1>

      <ProductsTotal productsTotal={productsTotal} />

      <div className={styles.filters}>
        <div className={styles['search-container']}>
          <SearchField />
        </div>

        <div className={styles['dropdowns-container']}>
          <DropdownSelect
            options={SORT_OPTIONS}
            label="Sort by"
            className="sort-dropdown"
            value={sortBy}
            onChange={handleSortChange}
          />
          <DropdownSelect
            options={PER_PAGE_OPTIONS}
            label="Items on page"
            className="per-page-dropdown"
            value={perPage}
            onChange={handlePerPageChange}
          />
        </div>
      </div>

      <ProductList products={paginatedProducts} category={currentCategory} />

      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
