import { FC } from 'react';

import styles from './cartSummary.module.scss';
import { useAppSelector } from '@hooks/hook';
import {
  selectCartTotal,
  selectTotalQuantity,
} from '@store/features/cart/cart.slice';

export const CartSummary: FC = () => {
  const totalPrice = useAppSelector(selectCartTotal);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <div className={styles.summary}>
      <span>${totalPrice}</span>
      <p>
        Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
      </p>
      <div className={styles.separator}></div>
      <button type="button">Checkout</button>
    </div>
  );
};
