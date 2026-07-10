import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  productItems: Product[];
};
export const ProductsList: React.FC<Props> = ({ productItems }) => (
  <ul className={styles.list}>
    {productItems.map(item => (
      <li key={item.id} className={styles.listItem}>
        <ProductCard product={item} />
      </li>
    ))}
  </ul>
);
