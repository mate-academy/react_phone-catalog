import React from 'react';
import { useCart } from '../../../context/CartContext';
import styles from './CartTotal.module.scss';

export const CartTotal: React.FC = () => {
  const { cartItems, clearCart } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart__total}>
      <div className={styles.cart__totalInfo}>
        <h2 className={styles.cart__totalPrice}>${totalPrice}</h2>
        <span className={styles.cart__totalQuantity}>
          Total for {totalQuantity} items
        </span>
      </div>

      <hr className={styles.cart__totalDivider} />

      <button
        type="button"
        className={styles.cart__buttonCheckout}
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
