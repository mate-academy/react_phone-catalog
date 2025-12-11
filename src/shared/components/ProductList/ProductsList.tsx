import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';
import React from 'react';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.item}>
          <ProductCard
            product={product}
            showOldPrice={product.fullPrice > product.price}
          />
        </li>
      ))}
    </ul>
  );
};
