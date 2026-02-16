import React from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { CartItem } from '../../components/CartItem';

import styles from './CartPage.module.scss';
import { ButtonBack } from '../../components/ButtonBack';

export const CartPage: React.FC = () => {
  const { cart, totalQuantity, totalAmount, clearCart } = useCart();

  const handleCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return <p className={styles.cart__title}>Your cart is empty</p>;
  }

  return (
    <>
      <ButtonBack />
      <h1 className={styles.cart__title}>Cart</h1>
      <div className={styles.cart__page}>
        <div className={styles.cart__items}>
          {cart.map(item => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className={styles.cart__checkout}>
          <div className={styles['cart__price-description']}>
            <p className={styles['cart__checkout--price']}>${totalAmount}</p>
            <p className={styles['cart__checkout--total']}>
              Total for {totalQuantity} items
            </p>
          </div>
          <button
            className={styles['cart__checkout--button']}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
