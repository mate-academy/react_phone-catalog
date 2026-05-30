import React from 'react';
import { ProductGeneral } from '../../../types/ProductGeneral';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';
import { Pagination } from '../Pagination';
import { getProductsWithPagination } from '../../../utils/productsHelper';

type Props = {
  products: ProductGeneral[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');
  const perPageValue =
    perPage && Number.isInteger(+perPage) ? +perPage : products.length;

  const currentPage = +(searchParams.get('page') || 1);

  const visibleProducts = getProductsWithPagination(
    products,
    perPageValue,
    currentPage,
  );

  const handleCurrentPageChange = (value: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: value === 1 ? null : `${value}` }),
    );
  };

  return (
    <>
      <div className={styles.ProductsList}>
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            good={product}
            otherClassName={styles.ProductsList__card}
          />
        ))}
      </div>

      {products.length > perPageValue && (
        <Pagination
          total={products.length}
          perPage={perPageValue}
          currentPage={currentPage}
          onPageChange={(value: number) => handleCurrentPageChange(value)}
        />
      )}
    </>
  );
};
