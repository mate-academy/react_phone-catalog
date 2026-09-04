/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../../api/products';
import { Category, Product } from '../../../types/Product';
import { Loader } from '../../../components/Loader';
import { ProductsList } from '../../../components/ProductsList';
import { SearchField } from '../../../components/SearchField';
import styles from './CategoryPage.module.scss';

type Props = {
  category: Category;
  title: string;
};

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

const getPageNumbers = (
  current: number,
  total: number,
): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  pages.push(total);

  return pages;
};

export const CategoryPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';
  const query = searchParams.get('query') || '';

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (!query) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];

    switch (sort) {
      case 'age':
        return copy.sort((a, b) => b.year - a.year);
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      default:
        return copy;
    }
  }, [filteredProducts, sort]);

  const total = sortedProducts.length;
  const perPageNumber = perPage === 'all' ? total : Number(perPage);
  const totalPages = perPageNumber > 0 ? Math.ceil(total / perPageNumber) : 1;

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (page - 1) * perPageNumber;

    return sortedProducts.slice(start, start + perPageNumber);
  }, [sortedProducts, page, perPageNumber, perPage]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;

    const next = new URLSearchParams(searchParams);

    if (newSort) {
      next.set('sort', newSort);
    } else {
      next.delete('sort');
    }

    next.delete('page');

    setSearchParams(next);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    const next = new URLSearchParams(searchParams);

    if (newPerPage === 'all') {
      next.delete('perPage');
    } else {
      next.set('perPage', newPerPage);
    }

    next.delete('page');

    setSearchParams(next);
  };

  const handlePageChange = (newPage: number) => {
    const next = new URLSearchParams(searchParams);

    if (newPage === 1) {
      next.delete('page');
    } else {
      next.set('page', String(newPage));
    }

    setSearchParams(next);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>

      {!isLoading && !hasError && (
        <p className={styles.count}>{total} models</p>
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <div className={styles.controls}>
          <label className={styles.control}>
            <span>Sort by</span>

            <select value={sort} onChange={handleSortChange}>
              <option value="" disabled hidden>
                Sort by
              </option>
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          <label className={styles.control}>
            <span>Items on page</span>

            <select value={perPage} onChange={handlePerPageChange}>
              {PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All' : option}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.control}>
            <span>Search</span>
            <SearchField placeholder={`Search in ${category}...`} />
          </label>
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <p className={styles.message}>There are no {category} yet</p>
      )}

      {!isLoading && !hasError && products.length > 0 && total === 0 && (
        <p className={styles.message}>
          There are no {category} matching the query
        </p>
      )}

      {!isLoading && !hasError && total > 0 && (
        <ProductsList products={visibleProducts} />
      )}

      {!isLoading && !hasError && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            ‹
          </button>

          {getPageNumbers(page, totalPages).map((p, index) =>
            typeof p === 'number' ? (
              <button
                key={p}
                type="button"
                className={p === page ? styles.pageActive : ''}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </button>
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                {p}
              </span>
            ),
          )}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
};
