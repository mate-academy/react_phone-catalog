import { Link, useSearchParams } from 'react-router-dom';

import { Pagination } from '../../../components/Pagination';
import { ProductsList } from '../../../components/ProductsList';
import { Loader } from '../../../components/Loader';
import { ErrorMessage } from '../../../components/ErrorMessage';

import { useProducts } from '../../../hooks/useProducts';
import { Product } from '../../../types/Product';

import styles from './CatalogPage.module.scss';

import type { Category } from '../../../types/Category';
type SortType = 'age' | 'title' | 'price';
type PerPage = '4' | '8' | '16' | 'all';

type Props = {
  category: Category;
  title: string;
};

export const CatalogPage = ({ category, title }: Props) => {
  const { products, isLoading, error, reload } = useProducts(category);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = searchParams.get('page');
  const query = searchParams.get('query') || '';

  const sortBy: SortType =
    sortParam === 'title' || sortParam === 'price' ? sortParam : 'age';

  const perPage: PerPage =
    perPageParam === '4' || perPageParam === '8' || perPageParam === '16'
      ? perPageParam
      : 'all';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort(
    (a: Product, b: Product) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);

        case 'price':
          return a.price - b.price;

        case 'age':
        default:
          return b.year - a.year;
      }
    },
  );

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  const requestedPage = Number(pageParam);

  const currentPage =
    pageParam !== null && Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1;

  const firstItemIndex = (currentPage - 1) * itemsPerPage;

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(firstItemIndex, firstItemIndex + itemsPerPage);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sort', value);
      params.delete('page');

      return params;
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value === 'all') {
        params.delete('perPage');
      } else {
        params.set('perPage', value);
      }

      params.delete('page');

      return params;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }

      return params;
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={reload} />;
  }

  const hasProducts = products.length > 0;
  const hasMatchingProducts = filteredProducts.length > 0;

  const showPerPageSelect =
    hasMatchingProducts && (filteredProducts.length > 4 || perPage !== 'all');

  return (
    <div className={styles.catalog}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link to="/" className={styles.homeLink} aria-label="Home">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 10L12 3L21 10V21H14V14H10V21H3V10Z" />
          </svg>
        </Link>

        <span className={styles.breadcrumbArrow} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </span>

        <span className={styles.breadcrumbCurrent} aria-current="page">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </nav>

      <h1 className={styles.title}>{title}</h1>

      {!hasProducts ? (
        <p>There are no {category} yet</p>
      ) : (
        <>
          <p className={styles.count}>{filteredProducts.length} models</p>

          {hasMatchingProducts ? (
            <>
              <div className={styles.controls}>
                <div className={styles.control}>
                  <label htmlFor="sort">Sort by</label>

                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className={styles.select}
                  >
                    <option value="age">Newest</option>
                    <option value="title">Alphabetically</option>
                    <option value="price">Cheapest</option>
                  </select>
                </div>

                {showPerPageSelect && (
                  <div className={styles.control}>
                    <label htmlFor="perPage">Items on page</label>

                    <select
                      id="perPage"
                      value={perPage}
                      onChange={handlePerPageChange}
                      className={styles.select}
                    >
                      <option value="4">4</option>
                      <option value="8">8</option>
                      <option value="16">16</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                )}
              </div>

              <ProductsList products={visibleProducts} limitedDiscounts />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <p className={styles.emptyMessage}>
              There are no {category} matching the query
            </p>
          )}
        </>
      )}
    </div>
  );
};
