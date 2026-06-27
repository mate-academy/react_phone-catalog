import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { ProductsList } from '../../components/ProductsList';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { Dropdown } from '../../components/Dropdown';

import { Breadcrumbs } from '../../components/Breadcrumbs';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: '64', label: '64' },
];

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.replace('/', '');

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || '16';
  const perPage = Number(perPageParam);
  const currentPage = Number(searchParams.get('page')) || 1;

  const processedProducts = [...products];

  if (sortBy === 'age') {
    processedProducts.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'name') {
    processedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'price') {
    processedProducts.sort((a, b) => a.price - b.price);
  }

  const startIndex = (currentPage - 1) * perPage;
  const visibleProducts = processedProducts.slice(
    startIndex,
    startIndex + perPage,
  );

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', newSort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', newPerPage);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(data => setProducts(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <section className={styles.catalog}>
      <div className="container">
        <Breadcrumbs />

        <h1 className={styles.catalog__title}>
          {category === 'phones' ? 'Mobile phones' : 'Tablets'}
        </h1>

        <p className={styles.catalog__count}>{products.length} models</p>

        {!isLoading && !hasError && products.length > 0 && (
          <div className={styles.catalog__filters}>
            <Dropdown
              title="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
            />
            <Dropdown
              title="Items on page"
              options={perPageOptions}
              value={perPageParam}
              onChange={handlePerPageChange}
            />
          </div>
        )}

        <div className={styles.catalog__content}>
          {isLoading && <Loader />}

          {hasError && (
            <ErrorMessage onReload={() => window.location.reload()} />
          )}

          {!isLoading && !hasError && (
            <ProductsList products={visibleProducts} />
          )}
        </div>

        {!isLoading && !hasError && (
          <div className={styles.catalog__pagination}>
            <Pagination
              totalItems={products.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};
