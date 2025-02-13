import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.products__list}>
      {products.map(product => (
        <li key={product.id} className={styles.products__item}>
          <ProductCard product={product} hot={true} />
        </li>
      ))}
    </ul>
  );
};
