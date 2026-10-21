import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { matchesQuery } from '../../utils/matchesQuery';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import styles from './CatalogPage.module.scss';

const SORTERS: Record<string, (a: Product, b: Product) => number> = {
  age: (a, b) => b.year - a.year,
  title: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const ALL = 'all';
const PER_PAGE_STEPS = ['4', '8', '16', ALL];

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useLocation().pathname.slice(1);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getProducts()
      .then(data => setProducts(data.filter(p => p.category === category)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sort = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || ALL;
  const pageParam = parseInt(searchParams.get('page') || '1', 10) || 1;

  const sortedProducts = products
    .filter(p => matchesQuery(p.name, query))
    .sort(SORTERS[sort] || SORTERS.age);

  const perPage = Number(perPageParam) || sortedProducts.length;
  const totalPages = Math.ceil(sortedProducts.length / perPage) || 1;
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);
  const start = (currentPage - 1) * perPage;
  const visibleProducts = sortedProducts.slice(start, start + perPage);
  const perPageOptions = PER_PAGE_STEPS.filter(
    step => step === ALL || Number(step) < sortedProducts.length,
  ).map(step => ({ value: step, label: step }));

  const updateParams = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== 'page') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const isReady = !isLoading && !isError;

  return (
    <div className={styles.catalog} data-cy="CatalogPage">
      <Breadcrumbs />
      <h1 className={styles.catalog__title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} page
      </h1>
      <p className={styles.catalog__count}>{sortedProducts.length} models</p>

      {isReady && sortedProducts.length > 0 && (
        <div className={styles.catalog__filters}>
          <div className={styles.catalog__filter}>
            <Dropdown
              id="sort"
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              onChange={value => updateParams('sort', value, 'age')}
            />
          </div>
          {perPageOptions.length > 1 && (
            <div className={styles.catalog__filter}>
              <Dropdown
                id="perPage"
                label="Items on page"
                value={perPageParam}
                options={perPageOptions}
                onChange={value => updateParams('perPage', value, ALL)}
              />
            </div>
          )}
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

      {isReady && products.length === 0 && <p>There are no {category} yet</p>}

      {isReady && products.length > 0 && sortedProducts.length === 0 && (
        <p>There are no {category} matching the query</p>
      )}

      {isReady && sortedProducts.length > 0 && (
        <>
          <ProductsList products={visibleProducts} />
          <Pagination
            total={sortedProducts.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={page => updateParams('page', page.toString(), '1')}
          />
        </>
      )}
    </div>
  );
};
