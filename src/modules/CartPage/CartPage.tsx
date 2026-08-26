/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';

import styles from './CartPage.module.scss';
import { BASE_URL } from '../../constants/baseUrl';

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    cart,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className={styles.cart}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        <p className={styles.empty}>Your cart is empty</p>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.products}>
          {cart.map(item => (
            <div key={item.id} className={styles.product}>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>

              <img
                src={`${BASE_URL}${item.image.replace(/^\/+/, '')}`}
                alt={item.name}
                className={styles.image}
              />

              <div className={styles.info}>
                <h3>{item.name}</h3>
              </div>

              <div className={styles.quantity}>
                <button type="button" onClick={() => decreaseQuantity(item.id)}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button type="button" onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
              </div>

              <strong className={styles.price}>${item.price}</strong>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>${totalPrice}</h2>

          <p>Total for {totalItems} items</p>

          <button
            type="button"
            className={styles.checkout}
            onClick={() => {
              const confirmed = window.confirm(
                'Checkout is not implemented yet. Do you want to clear the Cart?',
              );

              if (confirmed) {
                clearCart();
              }
            }}
          >
            Checkout
          </button>
        </aside>
      </div>
    </section>
  );
};
