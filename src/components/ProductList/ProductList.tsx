/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../api/products';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
  isLoading?: boolean;
}

export const ProductList: React.FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={styles.productList}>
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div className={styles.productList__card} key={i}>
              <ProductCardSkeleton />
            </div>
          ))
        : products.map(product => (
            <div className={styles.productList__card} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
    </div>
  );
};
