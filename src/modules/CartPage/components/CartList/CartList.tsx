import React from 'react';
import classNames from 'classnames';

import { ProductWithQuantity } from '../../../../types';
import { CartItem } from '../CartItem';

import styles from './CartList.module.scss';

type Props = {
  products: ProductWithQuantity[];
  className?: string;
};

export const CartList: React.FC<Props> = ({ products, className = '' }) => {
  return (
    <ul className={classNames(styles['cart-list'], className)}>
      {products.map(product => (
        <li key={product.itemId} className={styles['cart-list__item']}>
          <CartItem product={product} />
        </li>
      ))}
    </ul>
  );
};
