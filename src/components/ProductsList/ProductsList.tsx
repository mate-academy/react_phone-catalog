import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsList.module.scss';

import { ProductInfo } from '../../types/ProductInfo';
import { ProductCard } from '../ProductCard';
import { SortType } from '../../types/SortType';
import { sortProducts } from '../../helpers/sortProducts';
import { Pagination } from '../Pagination';
import { ProductNotFound } from '../ProductNotFound';

type Props = {
  products: ProductInfo[];
  showPagination: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  showPagination = true,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sortBy') || SortType.newest;
  const onPage = searchParams.get('onPage') || '16';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const cardWidth = 'auto';

  const perPage = onPage === 'all' ? products.length : +onPage;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const preparedProducts = sortProducts(sort, filteredProducts).slice(
    (+page - 1) * perPage,
    +page * perPage,
  );

  const hasFilteredProducts = filteredProducts.length > 0;
  const hasPagination =
    showPagination && hasFilteredProducts && onPage !== 'all';

  return (
    <>
      {hasFilteredProducts ? (
        <section className={styles.products}>
          {preparedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              type={'Hot prices'}
              cardWidth={cardWidth}
            />
          ))}
        </section>
      ) : (
        <ProductNotFound />
      )}

      {hasPagination && (
        <Pagination
          total={products.length}
          perPage={perPage}
          currentPage={+page}
        />
      )}
    </>
  );
};
