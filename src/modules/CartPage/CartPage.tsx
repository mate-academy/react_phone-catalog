import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, clearCart, totalPrice, totalQuantity } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.emptyCart}>Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.itemsList}>
          {cart.map(item => (
            <CartItem key={item.product.id} cartItem={item} />
          ))}
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.totalAmount}>
            <span className={styles.totalPrice}>${totalPrice}</span>

            <span className={styles.totalItems}>
              Total for {totalQuantity} items
            </span>
          </div>

          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
