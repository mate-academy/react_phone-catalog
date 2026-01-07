import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, totalCount } = useCart();

  // Obliczamy sumę całkowitą koszyka ($)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  if (totalCount === 0) {
    return (
      <div className="container">
        <h1 className={styles.title}>Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.cart}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.grid}>
          {/* Lista produktów */}
          <div className="cart__list">
            {cartItems.map(item => (
              <div key={item.id} className={styles.item}>
                {/* Zdjęcie i Nazwa */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <span className={styles.itemName}>{item.name}</span>
                </div>

                {/* Licznik +/- */}
                <div className={styles.counter}>
                  <button
                    className={styles.countBtn}
                    onClick={() => removeFromCart(item.id)}
                    // Opcjonalnie: disabled={item.count === 1} jeśli nie chcesz usuwać minusem
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    className={styles.countBtn}
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>

                {/* Cena */}
                <span className={styles.itemPrice}>${item.price}</span>
              </div>
            ))}
          </div>

          {/* Podsumowanie */}
          <div className={styles.checkout}>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>
            <span className={styles.totalLabel}>
              Total for {totalCount} items
            </span>

            <div className={styles.divider} />

            <button
              className={styles.checkoutBtn}
              onClick={() => alert('Implement checkout later!')}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
