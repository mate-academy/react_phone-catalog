import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../shared/context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCount, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

  const handleCheckout = () => {
    alert('Thank you for your order!');
    clearCart();
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        &lt; Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cart.map(item => (
              <div key={item.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  className={styles.image}
                />
                <span className={styles.name}>{item.name}</span>

                <div className={styles.counter}>
                  <button
                    type="button"
                    disabled={item.count <= 1}
                    onClick={() => updateCount(item.id, item.count - 1)}
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    type="button"
                    onClick={() => updateCount(item.id, item.count + 1)}
                  >
                    +
                  </button>
                </div>

                <span className={styles.price}>${item.price * item.count}</span>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.totalPrice}>${totalAmount}</span>
            <span className={styles.totalCount}>
              {`Total for ${totalCount} items`}
            </span>
            <button
              type="button"
              className={styles.checkoutBtn}
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
