import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsList.module.scss';

import { ProductInfo } from '../../types/ProductInfo';
import { ProductCard } from '../ProductCard';
import { SortType } from '../../types/SortType';
import { sortProducts } from '../../helpers/sortProducts';
import { Pagination } from '../Pagination';
import { ProductNotFound } from '../ProductNotFound';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  products: ProductInfo[];
  showPagination: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  showPagination = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sortBy') || SortType.newest;
  const onPage = searchParams.get('onPage') || '16';
  const query = searchParams.get('query') || '';
  let page = searchParams.get('page') || '1';

  useEffect(() => {
    if (query !== '') {
      page = '1';

      const newSearchParams = getSearchWith(searchParams, { query, page });
      setSearchParams(newSearchParams);
    }
  }, [query, searchParams, setSearchParams]);

  const cardWidth = 'auto';

  const perPage = onPage === 'all' ? products.length : +onPage;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedProducts = sortProducts(sort, filteredProducts);

  const startIndex = (+page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, sortedProducts.length);
  const preparedProducts = sortedProducts.slice(startIndex, endIndex);

  const hasFilteredProducts = filteredProducts.length > 0;
  const hasPagination = showPagination && hasFilteredProducts && onPage !== 'all';

  return (
    <>
      {hasFilteredProducts && (
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
      )}

      {query !== '' && !hasFilteredProducts && <ProductNotFound />}

      {hasPagination && (
        <Pagination
          total={filteredProducts.length}
          perPage={perPage}
          currentPage={+page}
        />
      )}
    </>
  );
};
