// src/modules/CartPage/CartPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../component/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
  } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.priceDiscount ?? item.price ?? 0;

    return sum + itemPrice * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>Your cart is empty.</h2>
          <Link to="/" className={styles.backButton}>
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartList}>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increaseQuantity(String(item.id))}
              onDecrease={() => decreaseQuantity(String(item.id))}
              onRemove={() => removeFromCart(String(item.id))}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.total}>
            <p className={styles.totalPrice}>${totalPrice.toFixed(2)}</p>
            <p className={styles.totalItems}>
              Total for {getTotalItems()} items
            </p>
          </div>

          <button onClick={clearCart} className={styles.checkoutButton}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};
