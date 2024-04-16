import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsList.module.scss';
// import { useAppDispatch } from '../../app/hook';
// import { fetchPhones } from '../../features/phonesSlice';

import { ProductInfo } from '../../types/ProductInfo';
import { ProductCard } from '../ProductCard';
import { SortType } from '../../types/SortType';
import { sortProducts } from '../../helpers/sortProducts';
import { Pagination } from '../Pagination';

type Props = {
  products: ProductInfo[];
  showPagination: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  showPagination = true,
}) => {
  const [searchParams] = useSearchParams();

  // const { phones } = useAppSelector(state => state.phones);

  const sort = searchParams.get('sortBy') || SortType.newest;
  const onPage = searchParams.get('onPage') || '16';
  const page = searchParams.get('page') || '1';

  const cardWidth = 'auto';

  const perPage = onPage === 'all' ? products.length : +onPage;

  // const preparedProducts = onPage === 'all'
  // ? sortProducts(sort, products)
  // : sortProducts(sort, products).slice(
  //     (+page - 1) * perPage,
  //     +page * perPage,
  //   );

  const preparedProducts = sortProducts(sort, products).slice(
    (+page - 1) * perPage,
    +page * perPage,
  );

  return (
    <>
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

      {showPagination && onPage !== 'all' && !!products.length && (
        <Pagination
          total={products.length}
          perPage={perPage}
          currentPage={+page}
        />
      )}
    </>
  );
};
