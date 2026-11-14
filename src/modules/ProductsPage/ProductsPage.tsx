import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { request } from '../../utils/fetchResponse';
import { isCategory, TITLES } from '../../utils/isCategory';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import { SkeletonLine } from '../../components/Skeletons/SkeletonLine';
import { NotFoundPage } from '../../components/NotFoundPage';
import { Toolbar } from './Toolbar';
import { PaginationControls } from './PaginationControls';
import { NotFoundProducts } from './NotFoundProducts';

import { Product } from '../../types/Product';

import styles from './ProductsPage.module.scss';

export const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reloadKey, setReloadKey] = useState(0);

  const sortBy = searchParams.get('sort') ?? 'all';
  const perPage = searchParams.get('perPage') ?? 'all';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!isCategory(category)) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    request<Product[]>('/products.json')
      .then(data => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category, reloadKey]);

  if (!isCategory(category)) {
    return <NotFoundPage />;
  }

  const sortedProducts = [...products].sort((left, right) => {
    switch (sortBy) {
      case 'age':
        return right.year - left.year;

      case 'title':
        return left.name.localeCompare(right.name);

      case 'price':
        return left.price - right.price;

      default:
        return 0;
    }
  });

  const parsed = Number(perPage);
  const perPageNumber =
    perPage === 'all' || !Number.isInteger(parsed) || parsed < 1
      ? sortedProducts.length
      : +perPage;
  const pages = Math.ceil(sortedProducts.length / perPageNumber);
  const currentPage = Math.min(Math.max(page, 1), pages || 1);

  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * perPageNumber,
    currentPage * perPageNumber,
  );

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
    <section className={styles['product-page']}>
      <div className={styles['product-page__wrapper']}>
        <h1
          className={styles['visually-hidden']}
        >{`${category[0].toUpperCase()}${category.slice(1)} page`}</h1>

        <Breadcrumbs />

        <div className={styles['product-page__header']}>
          <h2 className={styles['product-page__header-title']}>
            {TITLES[category]}
          </h2>
          <div className={styles['product-page__header-subtitle']}>
            {isLoading ? (
              <SkeletonLine height="21" />
            ) : (
              `${sortedProducts.length} models`
            )}
          </div>
        </div>

        <Toolbar />

        <ProductList isLoading={isLoading} products={visibleProducts} />

        {isLoading && (
          <div style={{ marginTop: '40px', placeItems: 'center' }}>
            <SkeletonLine height="31" width="320" />
          </div>
        )}

        {!isLoading && !hasError && pages > 1 && (
          <PaginationControls
            total={pages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}

        {hasError && (
          <NotFoundProducts
            category={category}
            onReload={() => setReloadKey(key => key + 1)}
          />
        )}

        {!isLoading && !hasError && products.length === 0 && (
          <NotFoundProducts
            category={category}
            onReload={() => setReloadKey(key => key + 1)}
          />
        )}
      </div>
    </section>
  );
};
