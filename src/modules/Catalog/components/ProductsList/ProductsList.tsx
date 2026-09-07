import React from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles['products-list']}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          className={styles.card}
        />
      ))}
    </div>
  );
};
