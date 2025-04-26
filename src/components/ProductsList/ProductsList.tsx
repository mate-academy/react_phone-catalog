import React from 'react';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../../components';
import { Product } from '../../typies';

type Props = {
  products: Product[] | null;
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products?.map(productItem => (
        <li key={productItem.id} className={styles.item}>
          <ProductCard product={productItem} />
        </li>
      ))}
    </ul>
  );
};
