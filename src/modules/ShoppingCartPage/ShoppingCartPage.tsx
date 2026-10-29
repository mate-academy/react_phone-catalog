import React, { useContext } from 'react';
import { BackButton } from '../shared/components/BackButton';
import { CartContext } from '../../context/CartContext';
import { CartItem } from './components/CartItem';
import styles from './ShoppingCartPage.module.scss';

export const ShoppingCartPage = () => {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <BackButton />
      </div>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="img/cart-is-empty.png"
            alt="Empty cart"
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles.count}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>

            <button
              type="button"
              className={styles.checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
