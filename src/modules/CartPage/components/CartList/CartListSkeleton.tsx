import React from 'react';
import classNames from 'classnames';

import { CartItemSkeleton } from '../CartItem';
import styles from './CartList.module.scss';

type Props = {
  className?: string;
  amount?: number;
};

export const CartListSkeleton: React.FC<Props> = ({
  className = '',
  amount = 4,
}) => {
  return (
    <ul className={classNames(styles['cart-list'], className)}>
      {Array.from({ length: amount }).map((_, index) => (
        <li key={index} className={styles['cart-list__item']}>
          <CartItemSkeleton />
        </li>
      ))}
    </ul>
  );
};
