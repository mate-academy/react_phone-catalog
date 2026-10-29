import React from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = { products: Product[] };

export const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
