import React from 'react';
import { Product } from '../../types/Product';
import { ProductCart } from '../ProductCart/ProductCart';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.productList}>
      {products.map(product => (
        <li key={product.id} className={styles.productList__item}>
          <ProductCart product={product} />
        </li>
      ))}
    </ul>
  );
};
