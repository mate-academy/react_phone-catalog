import React from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../types/ProductType';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div className={styles['products-list']}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          className={styles['products-list__card']}
        />
      ))}
    </div>
  );
};
