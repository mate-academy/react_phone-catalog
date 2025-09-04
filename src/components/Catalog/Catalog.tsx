import React, { useEffect, useMemo, useState } from 'react';
import styles from './Catalog.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/products';
import { getPreperedProducts } from '../../utils/sortProducts';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../shared/Loader/Loader';
import { ProductsList } from '../ProductsList/ProductsList';
import { NotFoundPage } from '../../modules/NotFoundPage/NotFoundPage';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reload, setReload] = useState(new Date());

  const sortField = searchParams.get('sortField') || '';
  const page = +(searchParams.get('page') || '1');
  const perPageParam = searchParams.get('perPage') || 'all';
  const isAllSelected = perPageParam === 'all';
  const perPage = isAllSelected ? products.length || 1 : Number(perPageParam);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const { category } = useParams();
  const validCategories = ['phones', 'tablets', 'accessories'];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getProducts()
        .then(productsFromServer => setProducts(productsFromServer))
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }, 1000);
  }, [reload, category]);

  const categoryProducts = products.filter(
    product => product.category === category,
  );

  const sortedProducts = useMemo(() => {
    return getPreperedProducts(categoryProducts, sortField);
  }, [categoryProducts, sortField]);

  const visibleProducts = sortedProducts.slice(
    isAllSelected ? 0 : (page - 1) * perPage,
    isAllSelected ? undefined : (page - 1) * perPage + perPage,
  );

  const handleSortFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('sortField', event.target.value);
    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', event.target.value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage !== 1) {
      params.set('page', String(newPage));
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const reloadPage = () => {
    setReload(new Date());
    setErrorMessage('');
  };

  if (category) {
    if (!validCategories.includes(category)) {
      return <NotFoundPage />;
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={styles.container}>
        {loading && <Loader />}
        {!loading && visibleProducts.length > 0 && (
          <>
            <Breadcrumbs pathnames={pathnames} />

            <div className={styles.catalog__box}>
              <h1 className={styles.catalog__title}>
                {category === 'phones' && 'Mobile phones'}
                {category === 'tablets' && 'Tablets'}
                {category === 'accessories' && 'Accessories'}
              </h1>
              <span className={styles.catalog__modelsCount}>
                {categoryProducts.length} models
              </span>
            </div>

            <div className={styles.catalog__selectWrapper}>
              <label htmlFor="sortBy" className={styles.catalog__label}>
                <span>Sort by</span>
                <div className={styles.catalog__customSelect}>
                  <select
                    value={sortField}
                    onChange={handleSortFieldChange}
                    id="sortBy"
                    className={styles.catalog__select}
                  >
                    <option value="Newest">Newest</option>
                    <option value="Alphabetically">Alphabetically</option>
                    <option value="Cheapest">Cheapest</option>
                  </select>
                </div>
              </label>

              <label htmlFor="itemsOnPage" className={styles.catalog__label}>
                <span>Items on page</span>
                <div className={styles.catalog__customSelect}>
                  <select
                    id="itemsOnPage"
                    className={styles.catalog__select}
                    value={perPageParam}
                    onChange={handlePerPageChange}
                  >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="all">all</option>
                  </select>
                </div>
              </label>
            </div>

            <div className={styles.catalog__wrapperList}>
              <ProductsList products={visibleProducts} />
            </div>

            {!isAllSelected && (
              <Pagination
                total={sortedProducts.length}
                perPage={perPage}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!loading && !errorMessage && visibleProducts.length === 0 && (
          <p className={styles.catalog__errorItems}>
            There are no {category} yet
          </p>
        )}

        {errorMessage && (
          <div className={styles.catalog__errorWrapper}>
            <p className={styles.catalog__error}>{errorMessage}</p>
            <button
              className={styles.catalog__reloadBtn}
              onClick={reloadPage}
              type="button"
            >
              Reload
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
