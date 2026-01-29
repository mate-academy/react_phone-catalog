import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  // Pobieramy funkcję clearCart z naszego Contextu
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  // Funkcja obsługująca proces zamówienia
  const handleCheckout = () => {
    // 1. Pytamy użytkownika o potwierdzenie
    const isConfirmed = window.confirm(
      'Do you want to finalize your purchase?',
    );

    // 2. Jeśli kliknie "OK"
    if (isConfirmed) {
      clearCart(); // Czyścimy koszyk
      alert('Thank you for your order! 🚀');
      navigate('/'); // Przekierowujemy na stronę główną
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className="container">
        {/* Przycisk Wstecz */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/arrow-left.svg`}
            alt="<"
          />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img
              src={`${import.meta.env.BASE_URL}/img/cart-is-empty.png`}
              alt="Empty"
              className={styles.emptyImage}
            />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.cartList}>
              {cartItems.map(item => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </div>

            <div className={styles.checkoutBox}>
              <div className={styles.totalPrice}>
                <h2>${totalAmount}</h2>
                <span className={styles.totalLabel}>
                  Total for {totalCount} items
                </span>
              </div>
              <div className={styles.divider} />

              {/* Podpięcie funkcji zamiast window.alert */}
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
