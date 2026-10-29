import React, { useCallback, useEffect, useState } from 'react';
import { Category, Product } from '../../types';
import { CATEGORY_TITLES } from '../../utils/categoryTitles';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../shared/components/ProductsList';
import { getProductCategory } from '../../api/products';
import { Loader } from '../shared/components/Loader';
import { Pagination } from './components/Pagination';
import styles from './ProductPage.module.scss';

type Props = {
  category: Category;
};

export const ProductPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    getProductCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sort === 'price') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const itemsPerPage = Number(perPage);
  const start = (page - 1) * itemsPerPage;

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(start, start + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs category={category} />
      <h1 className={styles.title}>{CATEGORY_TITLES[category]}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.controls}>
        <label className={styles.control}>
          <span className={styles.label}>Sort by</span>
          <select
            className={styles.select}
            value={sort}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              params.set('sort', event.target.value);
              setSearchParams(params);
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>

        <label className={styles.control}>
          <span className={styles.label}>Items on page</span>
          <select
            className={styles.select}
            value={perPage}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              if (event.target.value === 'all') {
                params.delete('perPage');
              } else {
                params.set('perPage', event.target.value);
              }

              params.delete('page');
              setSearchParams(params);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>

      {isLoading && <Loader />}

      {hasError && (
        <div className={styles.error}>
          <p className={styles.message}>Something went wrong</p>
          <button type="button" className={styles.reload} onClick={loadData}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <p className={styles.message}>There are no {category} yet</p>
      )}

      <ProductList products={visibleProducts} />

      {perPage !== 'all' && (
        <div className={styles.pagination}>
          <Pagination
            total={products.length}
            perPage={itemsPerPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
