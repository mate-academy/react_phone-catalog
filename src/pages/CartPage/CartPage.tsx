/* src/pages/CartPage/CartPage.tsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  return (
    <div className={styles.cartPage}>
      <div className="container">
        {/* Przycisk Wstecz */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src="/img/icons/arrow-left.svg" alt="<" />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img
              src="/img/cart-is-empty.png"
              alt="Empty"
              className={styles.emptyImage}
            />
            <p>Your cart is empty</p>
          </div>
        ) : (
          /* GLÓWNY GRID: Lewa (Produkty) + Prawa (Suma) */
          <div className={styles.cartContainer}>
            <div className={styles.cartList}>
              {cartItems.map(item => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </div>

            {/* BOX SUMY (Checkout) */}
            <div className={styles.checkoutBox}>
              <div className={styles.totalPrice}>
                <h2>${totalAmount}</h2>
                <span className={styles.totalLabel}>
                  Total for {totalCount} items
                </span>
              </div>
              <div className={styles.divider} />
              <button
                className={styles.checkoutBtn}
                onClick={() => window.alert('Not implemented')}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
