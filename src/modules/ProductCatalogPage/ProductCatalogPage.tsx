import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCatalogProducts } from '../../api/productsApi';
import { Product } from '../../api/types';
import { ProductsList } from '../../shared/ProductsList';
import { Pagination } from '../../shared/Pagination';
import { Loader } from '../../shared/Loader';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { getProductPrice } from '../../shared/utils/format';
import { NotFoundPage } from '../NotFoundPage';
import styles from './ProductCatalogPage.module.scss';

const VALID_CATEGORIES = ['phones', 'tablets', 'accessories'];

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_VALUES = ['age', 'title', 'price'] as const;

type SortValue = (typeof SORT_VALUES)[number];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const ProductCatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get('query') ?? '').trim();
  const sortParam = searchParams.get('sort') ?? 'age';
  const sort = SORT_VALUES.includes(sortParam as SortValue)
    ? (sortParam as SortValue)
    : 'age';
  const page = Number(searchParams.get('page') ?? '1');
  const perPage = (searchParams.get('perPage') ?? '16') as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    getCatalogProducts()
      .then(items => {
        if (cancelled) {
          return;
        }

        setProducts(items.filter(item => item.category === category));
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === 'age') {
      return list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }

    if (sort === 'title') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  }, [products, sort]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    if (!normalizedQuery) {
      return sortedProducts;
    }

    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [sortedProducts, query]);

  const pageSize =
    perPage === 'all' ? Math.max(1, visibleProducts.length) : Number(perPage);
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const items = visibleProducts.slice(startIndex, startIndex + pageSize);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === 'all' || value === '1') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');

    if (event.target.value === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', event.target.value);
    }

    setSearchParams(params);
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');

    if (event.target.value === '16') {
      params.delete('perPage');
    } else {
      params.set('perPage', event.target.value);
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  const emptyMessage = query
    ? `There are no ${category ?? ''} matching the query`
    : `There are no ${category ?? ''} yet`;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return <NotFoundPage />;
  }

  const categoryLabel =
    CATEGORY_TITLES[category ?? ''] ??
    `${(category ?? '').charAt(0).toUpperCase()}${(category ?? '').slice(1)}`;
  const crumbLabel = `${(category ?? '').charAt(0).toUpperCase()}${(category ?? '').slice(1)}`;

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: crumbLabel, path: `/${category}` }]} />
      <h1 className={styles.title}>{categoryLabel}</h1>
      {!isLoading && !hasError && (
        <p className={styles.modelsCount}>
          {visibleProducts.length}{' '}
          {visibleProducts.length === 1 ? 'model' : 'models'}
        </p>
      )}
      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>Sort by</span>
          <select
            className={styles.select}
            value={sort}
            onChange={handleSortChange}
          >
            {SORT_VALUES.map(value => (
              <option key={value} value={value}>
                {value === 'age'
                  ? 'Newest'
                  : value === 'title'
                    ? 'Alphabetically'
                    : 'Cheapest'}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.control}>
          <span className={styles.label}>Items on page</span>
          <select
            className={styles.select}
            value={perPage}
            onChange={handlePerPageChange}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All' : option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <Loader count={8} />
      ) : hasError ? (
        <div className={styles.state}>
          <p>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      ) : (
        <>
          <ProductsList
            products={items}
            isLoading={false}
            emptyMessage={emptyMessage}
          />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
