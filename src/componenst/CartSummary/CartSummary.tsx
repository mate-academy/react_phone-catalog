import React from 'react';
import styles from './CartSummary.module.scss';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
  quantities: Record<string, number>;
}

const CartSummary: React.FC<Props> = ({ products, quantities }) => {
  const total = products.reduce((sum, product) => {
    const price =
      product.priceDiscount ?? product.priceRegular ?? product.price ?? 0;
    const quantity = quantities[product.id] || 1;

    return sum + price * quantity;
  }, 0);

  const totalItems = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartSummary__info}>
        <div className={styles.cartSummary__total}>${total}</div>
        <div className={styles.cartSummary__text}>
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className={styles.cartSummary__divider} />

      <button type="button" className={styles.cartSummary__checkout}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
