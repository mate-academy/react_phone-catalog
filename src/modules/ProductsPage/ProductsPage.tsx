import { useEffect, useState, useCallback } from 'react';
import type { Category, Product } from '../../types';
import { getProductsByCategory } from '../../api';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ErrorBlock } from '../../components/ErrorBlock';
import styles from './ProductsPage.module.scss';

type ProductsPageProps = {
  category: Category;
  title: string;
};

const PAGE_TITLES: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = ({ category }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = Number(searchParams.get('page') || 1);

  const sortedProducts = [...products];

  const sort =
    sortParam === 'title' || sortParam === 'price' || sortParam === 'age'
      ? sortParam
      : 'age';

  const perPage =
    perPageParam === '4' ||
    perPageParam === '8' ||
    perPageParam === '16' ||
    perPageParam === 'all'
      ? perPageParam
      : 'all';
  const rawPage = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  sortedProducts.sort((productA, productB) => {
    switch (sort) {
      case 'title':
        return productA.name.localeCompare(productB.name);
      case 'price':
        return productA.price - productB.price;
      case 'age':
      default:
        return productB.year - productA.year;
    }
  });
  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);
  const page = Math.min(rawPage, totalPages || 1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);
  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setProducts([]);
    getProductsByCategory(category)
      .then(productsFromApi => setProducts(productsFromApi))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const handlePageChange = (number: number) => {
    const params = new URLSearchParams(searchParams);

    if (number === 1) {
      params.delete('page');
    } else {
      params.set('page', String(number));
    }

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const pageTitle = PAGE_TITLES[category];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ title: pageTitle }]} />

      <h1 className={styles.title}>{pageTitle}</h1>

      <p className={styles.count} data-cy="productsCount">
        {`${products.length} ${products.length === 1 ? 'model' : 'models'}`}
      </p>

      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorBlock onRetry={loadProducts} />}
      {!isLoading && !isError && products.length > 0 && (
        <>
          <div className={styles.controls}>
            <label className={styles.sortDropdown}>
              <span className={styles.controlLabel}>Sort by</span>

              <select
                className={styles.select}
                value={sort}
                onChange={event => handleSortChange(event.target.value)}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label className={styles.perPageDropdown}>
              <span className={styles.controlLabel}>Items on page</span>

              <select
                className={styles.select}
                value={perPage}
                onChange={event => handlePerPageChange(event.target.value)}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </label>
          </div>

          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                onPageChange={handlePageChange}
                totalPages={totalPages}
                currentPage={page}
              />
            </div>
          )}
        </>
      )}
      {!isLoading && !isError && products.length === 0 && (
        <p className={styles.empty}>{`There are no ${category} yet`}</p>
      )}
    </div>
  );
};
