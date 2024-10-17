import { FC } from 'react';

import { useAppSelector } from '@hooks/typedHooks';
import { useAction } from '@hooks/useActions';
import {
  selectCartTotal,
  selectTotalQuantity,
} from '@store/features/cart/cart.slice';

import { getPlural } from '@utils/helpers/getPlural';

import styles from './cartSummary.module.scss';

export const CartSummary: FC = () => {
  const { checkoutItems } = useAction();

  const totalPrice = useAppSelector(selectCartTotal);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const plural = getPlural(totalQuantity);

  return (
    <div className={styles.summary}>
      <span>${totalPrice}</span>
      <p>
        Total for {totalQuantity} {plural}
      </p>
      <div className={styles.separator}></div>
      <button type="button" onClick={() => checkoutItems()}>
        Checkout
      </button>
    </div>
  );
};
