import React from 'react';
import classNames from 'classnames';

import { ProductCardSkeleton } from '../ProductCard';

import styles from './ProductsList.module.scss';

type Props = {
  className?: string;
  amount?: number;
};

export const ProductsListSkeleton: React.FC<Props> = ({
  className = '',
  amount = 12,
}) => {
  return (
    <ul className={classNames(styles['products-list'], className)}>
      {Array.from({ length: amount }).map((_, index) => (
        <li key={index} className={styles['products-list__item']}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
};
