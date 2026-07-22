import { FC } from 'react';

import styles from './CartSummary.module.scss';
import { AddToCartButton } from '../../../shared/components/AddToCartButton';

type Props = {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
};

export const CartSummary: FC<Props> = ({
  totalItems,
  totalPrice,
  onCheckout,
}) => {
  return (
    <aside className={styles.cartSummary}>
      <div className={styles.cartSummary__info}>
        <h2 className={styles.cartSummary__price}>${totalPrice}</h2>
        <p className={styles.cartSummary__items}>
          Total for {totalItems} items
        </p>
      </div>

      <AddToCartButton
        className={styles.cartSummary__checkoutButton}
        onClick={onCheckout}
      >
        Checkout
      </AddToCartButton>
    </aside>
  );
};
