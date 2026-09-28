import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './CatalogPage.module.scss';

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

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
      .then(data => setProducts(data.filter(p => p.category === category)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || 'all';
  const pageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10) || 1;

  const normalizedQuery = query.trim().toLowerCase();

  const searchedProducts = normalizedQuery
    ? products.filter(p => p.name.toLowerCase().includes(normalizedQuery))
    : products;

  const sortedProducts = [...searchedProducts];

  if (sort === 'age') {
    sortedProducts.sort((a, b) => b.year - a.year);
  } else if (sort === 'title') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : parseInt(perPageParam, 10);

  const start = (currentPage - 1) * perPage;
  const visibleProducts =
    perPageParam === 'all'
      ? sortedProducts
      : sortedProducts.slice(start, start + perPage);

  const updateParams = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (['perPage', 'sort', 'query'].includes(key)) {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const showPagination =
    perPageParam !== 'all' && sortedProducts.length > perPage;
  const hasNoSearchResults =
    !isLoading &&
    !isError &&
    products.length > 0 &&
    searchedProducts.length === 0;

  return (
    <div className={styles.catalog} data-cy="CatalogPage">
      <Breadcrumbs />
      <h1 className={styles.catalog__title}>
        {CATEGORY_TITLES[category] || category}
      </h1>
      <p className={styles.catalog__count}>{searchedProducts.length} models</p>

      {!isLoading && !isError && searchedProducts.length > 0 && (
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

      {hasNoSearchResults && <p>There are no {category} matching the query</p>}

      {!isLoading && !isError && searchedProducts.length > 0 && (
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
