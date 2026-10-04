import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types/Category';
import { useProductsByCategory } from '../../hooks/useProductsByCategory';
import { DEFAULT_SORT, SortType, sortProducts } from '../../utils/sortProducts';
import { Container } from '../shared/components/Container';
import { Loader } from '../shared/components/Loader';
import { PageHeader } from '../shared/components/PageHeader';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';
import { Select } from '../shared/components/Select';
import styles from './CategoryPage.module.scss';

const CATEGORY_NAMES: Record<Category, { title: string; breadcrumb: string }> =
  {
    phones: { title: 'Mobile phones', breadcrumb: 'Phones' },
    tablets: { title: 'Tablets', breadcrumb: 'Tablets' },
    accessories: { title: 'Accessories', breadcrumb: 'Accessories' },
  };

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'].map(value => ({
  value,
  label: value,
}));

const DEFAULT_PER_PAGE = 'all';

const parseSort = (value: string | null): SortType =>
  SORT_OPTIONS.some(option => option.value === value)
    ? (value as SortType)
    : DEFAULT_SORT;

const parsePerPage = (value: string | null) =>
  PER_PAGE_OPTIONS.some(option => option.value === value)
    ? (value as string)
    : DEFAULT_PER_PAGE;

const parsePage = (value: string | null) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

interface Props {
  category: Category;
}

export const CategoryPage = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, hasError, reload } =
    useProductsByCategory(category);
  const { title, breadcrumb } = CATEGORY_NAMES[category];

  const sort = parseSort(searchParams.get('sort'));
  const perPageValue = parsePerPage(searchParams.get('perPage'));
  const perPage = perPageValue === 'all' ? null : Number(perPageValue);

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  const pagesCount = perPage ? Math.ceil(sortedProducts.length / perPage) : 1;
  const page = Math.min(parsePage(searchParams.get('page')), pagesCount || 1);
  const visibleProducts = perPage
    ? sortedProducts.slice((page - 1) * perPage, page * perPage)
    : sortedProducts;

  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value, page: null });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({ page: nextPage === 1 ? null : String(nextPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p className={styles.messageText}>Something went wrong</p>
          <button type="button" className={styles.button} onClick={reload}>
            Reload
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return <p className={styles.messageText}>There are no {category} yet</p>;
    }

    return (
      <>
        <div className={styles.controls}>
          <Select
            label="Sort by"
            value={sort}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
            className={styles.sort}
          />
          <Select
            label="Items on page"
            value={perPageValue}
            options={PER_PAGE_OPTIONS}
            onChange={handlePerPageChange}
            className={styles.perPage}
          />
        </div>

        <ProductsList products={visibleProducts} />

        {perPage && (
          <div className={styles.pagination}>
            <Pagination
              total={sortedProducts.length}
              perPage={perPage}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Container className={styles.page}>
      <PageHeader
        breadcrumbs={[{ label: breadcrumb }]}
        title={title}
        subtitle={
          !isLoading && !hasError ? `${products.length} models` : undefined
        }
      />

      {renderContent()}
    </Container>
  );
};
