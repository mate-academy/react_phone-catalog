import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { Product, SortType } from '../../types';
import { getProducts } from '../../utils/fetchClient';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';

interface Props {
  category: string;
  title: string;
}

const SORT_OPTIONS = [
  { value: SortType.Newest, label: 'Newest' },
  { value: SortType.Alphabetically, label: 'Alphabetically' },
  { value: SortType.Cheapest, label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortType) || SortType.Newest;
  const perPageParam = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  const loadData = () => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(data => {
        setProducts(data.filter(p => p.category === category));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(p =>
        p.name.toLowerCase().includes(normalizedQuery),
      );
    }

    switch (sort) {
      case SortType.Newest:
        result.sort((a, b) => b.year - a.year);
        break;
      case SortType.Alphabetically:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortType.Cheapest:
        result.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, sort, query]);

  const perPage =
    perPageParam === 'all' ? filteredProducts.length : Number(perPageParam);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * perPage;

    return filteredProducts.slice(startIndex, startIndex + perPage);
  }, [filteredProducts, page, perPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);
    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <p className={styles.errorText}>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadData}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{filteredProducts.length} models</p>

      {products.length === 0 ? (
        <NoResults categoryName={category} />
      ) : (
        <>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Sort by</span>
              <select
                className={styles.select}
                value={sort}
                onChange={handleSortChange}
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Items on page</span>
              <select
                className={styles.selectSmall}
                value={perPageParam}
                onChange={handlePerPageChange}
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {query && filteredProducts.length === 0 ? (
            <NoResults categoryName={`${category} matching the query`} />
          ) : (
            <>
              <ProductsList products={paginatedProducts} />

              {perPageParam !== 'all' && (
                <Pagination
                  total={filteredProducts.length}
                  perPage={perPage}
                  currentPage={page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
