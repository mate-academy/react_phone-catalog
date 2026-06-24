import { Product } from '../../../../types/productTypes';
import { ProductItem } from '../../../shared/ProductItem/ProductItem';
import styles from './ProductList.module.scss';
import React from 'react';

type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={styles.wrapper}>
      {products.map(product => (
        <ProductItem key={product.id} item={product} />
      ))}
    </div>
  );
};
