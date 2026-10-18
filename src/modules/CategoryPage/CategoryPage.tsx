import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCategoryProducts } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Container } from '../../components/Container';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { useRequest } from '../../hooks';
import { Category, SortType } from '../../types';
import { filterByQuery, sortProducts, updateSearchParams } from '../../utils';
import { StatusMessage } from '../shared';
import { ProductsControls } from './components/ProductsControls';
import {
  CATEGORY_TITLES,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
} from './constants';
import styles from './CategoryPage.module.scss';

const isSortType = (value: string | null): value is SortType =>
  SORT_OPTIONS.some(option => option.value === value);

export const CategoryPage = ({ category }: { category: Category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const loadProducts = useCallback(
    () => fetchCategoryProducts(category),
    [category],
  );
  const {
    data: products,
    isLoading,
    hasError,
    reload,
  } = useRequest(loadProducts);

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage') ?? DEFAULT_PER_PAGE;
  const query = searchParams.get('query') ?? '';

  const sortType = isSortType(sortParam) ? sortParam : DEFAULT_SORT;
  const perPage = PER_PAGE_OPTIONS.includes(perPageParam)
    ? perPageParam
    : DEFAULT_PER_PAGE;
  const requestedPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const visibleProducts = useMemo(
    () => sortProducts(filterByQuery(products ?? [], query), sortType),
    [products, query, sortType],
  );

  const itemsPerPage =
    perPage === DEFAULT_PER_PAGE
      ? Math.max(visibleProducts.length, 1)
      : Number(perPage);
  const pagesCount = Math.ceil(visibleProducts.length / itemsPerPage);
  const currentPage = Math.min(requestedPage, pagesCount);
  const pageProducts = visibleProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const changeParams = (updates: Record<string, string | null>) =>
    setSearchParams(updateSearchParams(searchParams, updates));

  const handleSortChange = (value: string) =>
    changeParams({ sort: value, page: null });

  const handlePerPageChange = (value: string) =>
    changeParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });

  const handlePageChange = (page: number) =>
    changeParams({ page: page === DEFAULT_PAGE ? null : String(page) });

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return <ErrorMessage onReload={reload} />;
    }

    if (!products?.length) {
      return <StatusMessage text={`There are no ${category} yet`} />;
    }

    if (!visibleProducts.length) {
      return (
        <StatusMessage text={`There are no ${category} matching the query`} />
      );
    }

    return (
      <>
        <ProductsControls
          sortType={sortType}
          perPage={perPage}
          hasPerPageSelect={visibleProducts.length > 4}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
        />

        <ProductsList products={pageProducts} />

        {pagesCount > 1 && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <Container>
      <Breadcrumbs items={[{ label: category }]} />

      <h1 className={styles['category-page__title']}>
        {CATEGORY_TITLES[category]}
      </h1>

      {!isLoading && !hasError && (
        <p className={styles['category-page__count']}>
          {products?.length ?? 0} models
        </p>
      )}

      {renderContent()}
    </Container>
  );
};
