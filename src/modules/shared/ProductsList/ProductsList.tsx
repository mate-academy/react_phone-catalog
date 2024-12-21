import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as productsActions from '../../../features/products/productsSlice';
import { Product } from '../Product/Product';
import styles from './ProductsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Skeleton } from '../Skeleton/Skeleton';
import { ProductCagetories } from '../../../types/ProductCategories';
import { PageHeader } from '../PageHeader';
import { getFilteredProducts } from '../../../services/getFilteredProducts';
import { setTitle } from '../../../services/setTitle';
import { SortBy } from '../../../types/SortBy';
import { Pagination } from '../Pagination';
import { Breadcrumbs } from '../Breadcrumbs';
import { getPreparedProducts } from '../../../services/getPreparedProducts';

type Props = {
  sortBy: ProductCagetories;
};

export const ProductsList: React.FC<Props> = ({ sortBy }) => {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(state => state.products);
  const title = setTitle(sortBy);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const sortType = searchParams.get('sort') as SortBy | null;
  const pages = searchParams.get('perPage') as string | number;
  const split = Number.isNaN(+pages) ? 1 : +pages;

  useEffect(() => {
    dispatch(productsActions.init());
  }, []);

  const pageFrom = split * (+currentPage - 1);
  const pageTo = split * +currentPage;

  const sortedProducts = getFilteredProducts(products, sortBy);
  const preparedProducts = getPreparedProducts(sortedProducts, {
    sortType,
    pages,
    pageFrom,
    pageTo,
  });

  const total = sortedProducts.length;

  return (
    <>
      <Breadcrumbs />
      <PageHeader title={title} quantity={sortedProducts.length} />

      <div className={`page__product-list ${styles['product-list']}`}>
        <div className={styles['product-list__container']}>
          <div className={styles['product-list__row']}>
            {error && <p>{error}</p>}

            {!error && (
              <>
                {loading &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}

                {!loading && !products.length && (
                  <p>There are no {sortBy} yet</p>
                )}

                {!loading &&
                  products.length !== 0 &&
                  preparedProducts.map(product => (
                    <div
                      className={styles['product-list__column']}
                      key={product.id}
                    >
                      {<Product product={product} hasFullPrice={true} />}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>

      {pages && (
        <Pagination currentPage={+currentPage} split={split} total={total} />
      )}
    </>
  );
};
