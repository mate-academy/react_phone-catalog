import React from 'react';
import classNames from 'classnames';

import { Product } from '../../types';

import { ProductCard } from '../ProductCard';

import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: React.FC<Props> = ({ products, className = '' }) => {
  if (!products.length) {
    return null;
  }

  return (
    <ul className={classNames(styles['products-list'], className)}>
      {products.map(product => (
        <li key={product.itemId} className={styles['products-list__item']}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
