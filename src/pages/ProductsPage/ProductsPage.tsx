/* eslint-disable @typescript-eslint/indent */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getProducts } from '../../api/products';
import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import homeIcon from '../../assets/icons/home-button.svg';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsGrid } from '../../components/ProductsGrid';
import { Product } from '../../types/Product';

import styles from './ProductsPage.module.scss';

type Props = {
  category: string;
  title: string;
};

type SortType = 'age' | 'alphabetically' | 'cheapest';
type PerPage = '4' | '8' | '16' | 'all';

const DEFAULT_SORT: SortType = 'age';
const DEFAULT_PER_PAGE: PerPage = 'all';

const SORT_VALUES: SortType[] = ['age', 'alphabetically', 'cheapest'];
const PER_PAGE_VALUES: PerPage[] = ['4', '8', '16', 'all'];

export const ProductsPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = searchParams.get('page');
  const queryParam = searchParams.get('query');

  const sort: SortType = SORT_VALUES.includes(sortParam as SortType)
    ? (sortParam as SortType)
    : DEFAULT_SORT;

  const perPage: PerPage = PER_PAGE_VALUES.includes(perPageParam as PerPage)
    ? (perPageParam as PerPage)
    : DEFAULT_PER_PAGE;

  const query = queryParam?.trim().toLowerCase() || '';

  const requestedPage = Number(pageParam);

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const categoryProducts = useMemo(() => {
    return products.filter(product => {
      return product.category === category;
    });
  }, [products, category]);

  const filteredProducts = useMemo(() => {
    if (!query) {
      return categoryProducts;
    }

    return categoryProducts.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }, [categoryProducts, query]);

  const sortedProducts = useMemo(() => {
    const preparedProducts = [...filteredProducts];

    switch (sort) {
      case 'alphabetically':
        return preparedProducts.sort((productA, productB) => {
          return productA.name.localeCompare(productB.name);
        });

      case 'cheapest':
        return preparedProducts.sort((productA, productB) => {
          return productA.price - productB.price;
        });

      case 'age':
      default:
        return preparedProducts.sort((productA, productB) => {
          return productB.year - productA.year;
        });
    }
  }, [filteredProducts, sort]);

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const totalPages =
    perPage === 'all' || sortedProducts.length === 0
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, perPage, safeCurrentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && currentPage !== 1) {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.delete('page');

      setSearchParams(nextParams, {
        replace: true,
      });
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  const handleSortChange = (value: SortType) => {
    updateSearchParams({
      sort: value === DEFAULT_SORT ? null : value,
      page: null,
    });
  };

  const handlePerPageChange = (value: PerPage) => {
    updateSearchParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({
      page: page === 1 ? null : String(page),
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const categoryName = category.toLowerCase();

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.homeLink} aria-label="Home">
            <img src={homeIcon} alt="" className={styles.homeIcon} />
          </Link>

          <img src={arrowDownIcon} alt="" className={styles.breadcrumbArrow} />

          <span className={styles.current}>{title}</span>
        </nav>

        <h1 className={styles.title}>{title}</h1>

        {!isLoading && !hasError && (
          <p className={styles.count}>{filteredProducts.length} models</p>
        )}

        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}

        {!isLoading && hasError && (
          <div className={styles.messageBlock}>
            <p className={styles.errorMessage}>Something went wrong</p>

            <button
              type="button"
              className={styles.reloadButton}
              onClick={loadProducts}
            >
              Reload
            </button>
          </div>
        )}

        {!isLoading && !hasError && categoryProducts.length === 0 && (
          <p className={styles.emptyMessage}>There are no {categoryName} yet</p>
        )}

        {!isLoading &&
          !hasError &&
          categoryProducts.length > 0 &&
          filteredProducts.length === 0 && (
            <p className={styles.emptyMessage}>
              There are no {categoryName} matching the query
            </p>
          )}

        {!isLoading && !hasError && filteredProducts.length > 0 && (
          <>
            <div className={styles.controls}>
              <label className={styles.field}>
                <span className={styles.label}>Sort by</span>

                <select
                  className={styles.select}
                  value={sort}
                  onChange={event => {
                    handleSortChange(event.target.value as SortType);
                  }}
                >
                  <option value="age">Newest</option>
                  <option value="alphabetically">Alphabetically</option>
                  <option value="cheapest">Cheapest</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Items on page</span>

                <select
                  className={styles.select}
                  value={perPage}
                  onChange={event => {
                    handlePerPageChange(event.target.value as PerPage);
                  }}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </label>
            </div>

            <ProductsGrid products={visibleProducts} />

            {perPage !== 'all' && totalPages > 1 && (
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
