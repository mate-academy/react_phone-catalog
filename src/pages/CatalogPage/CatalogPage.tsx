import { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const category = location.pathname.slice(1);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const sort = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || 'all';
  const pageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10) || 1;

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sort) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);
      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [products, sort]);

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : parseInt(perPageParam, 10);

  const visibleProducts = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, currentPage, perPage, perPageParam]);

  const updateParams = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key === 'perPage' || key === 'sort') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const showPagination =
    perPageParam !== 'all' && sortedProducts.length > perPage;

  return (
    <div className={styles.catalog} data-cy="CatalogPage">
      <h1 className={styles.catalog__title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} page
      </h1>

      <p className={styles.catalog__count}>{products.length} models</p>

      {!isLoading && !isError && products.length > 0 && (
        <div className={styles.catalog__filters}>
          <div className={styles.catalog__filter}>
            <label htmlFor="sort" className={styles['catalog__filter-label']}>
              Sort by
            </label>
            <div className="select">
              <select
                className={styles.select__control}
                id="sort"
                value={sort}
                onChange={e => updateParams('sort', e.target.value, 'age')}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </div>
          </div>

          <div className={styles.catalog__filter}>
            <label
              htmlFor="perPage"
              className={styles['catalog__filter-label']}
            >
              Items on page
            </label>
            <div className="select">
              <select
                className={styles.select__control}
                id="perPage"
                value={perPageParam}
                onChange={e => updateParams('perPage', e.target.value, 'all')}
              >
                <option value="all">All</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {isLoading && <Loader />}

      {isError && (
        <div className="has-text-danger">
          Something went wrong.
          <button
            onClick={() => window.location.reload()}
            className="button is-small ml-2"
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <p>There are no {category} yet</p>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <>
          <ProductsList products={visibleProducts} />

          {showPagination && (
            <Pagination
              total={sortedProducts.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={page => updateParams('page', page.toString(), '1')}
            />
          )}
        </>
      )}
    </div>
  );
};
