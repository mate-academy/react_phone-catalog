import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { normalizePath } from '../../api/products';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    changeQuantity,
    clearCart,
    totalPrice,
    totalQuantity,
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
    clearCart();
  };

  if (cart.length === 0 && !isModalOpen) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <h1>Your cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>

      {isModalOpen ? (
        <div className={styles.successMessage}>
          <h2>Checkout successfully completed! 🎉</h2>
          <p>Thank you for your purchase. We will contact you soon.</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cart.map(item => {
              return (
                <div
                  key={item.product.id}
                  className={styles.cartItem}
                  data-cy="cartItem"
                >
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => removeFromCart(item.product.id)}
                    data-cy="cartDeleteButton"
                  >
                    ✕
                  </button>

                  <img
                    src={normalizePath(item.product.image)}
                    alt={item.product.name}
                    className={styles.image}
                  />

                  <span className={styles.itemName}>{item.product.name}</span>

                  <div className={styles.counter}>
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() => changeQuantity(item.product.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.price}>
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              );
            })}
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
      )}
    </div>
  );
};
