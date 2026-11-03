import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../../../shared/types';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Pagination } from '../Pagination';

type Props = {
  products: Product[];
  total: number;
  perPage: string | number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const ProductList: React.FC<Props> = ({
  products,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      <div className={styles.list} data-cy="productList">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};
