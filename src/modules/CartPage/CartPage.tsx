import React, { useCallback } from 'react';
import { useCart } from '../shared/contexts/CartContext';
import { CartItem } from './components/CartItem';

import styles from './CartPage.module.scss';
import { ButtonBack } from '../shared/components/ButtonBack';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const handleCheckout = useCallback(() => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the cart?',
    );

    if (confirmed) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className={styles.cart}>
      <ButtonBack />
      <h1 className={styles.cart__title}>Cart</h1>
      {cart.length ? (
        <div className={styles.cart__content}>
          <div className={styles['cart__content-container']}>
            {cart.map(item => (
              <CartItem key={item.id} cartProduct={item} />
            ))}
          </div>
          <div className={styles.cart__total}>
            <div className={styles.cart__info}>
              <div
                className={styles['cart__total-price']}
              >{`$${totalPrice}`}</div>
              <div
                className={styles['cart__total-count']}
              >{`Total for ${totalQuantity} items`}</div>
            </div>
            <div className={styles['cart__total-line']} />
            <button
              className={styles['cart__total-button']}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.cart__empty}>
          <img
            src="./img/cart-is-empty.png"
            alt="cart is empty"
            className={styles['cart__empty-image']}
          />
        </div>
      )}
    </div>
  );
};
