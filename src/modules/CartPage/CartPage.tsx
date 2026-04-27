import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.pageHeader}>
          <i className="fas fa-shopping-cart"></i>
          <h1>Cart</h1>
        </div>
        <p className={styles.empty}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.pageHeader}>
        <i className="fas fa-shopping-cart"></i>
        <h1>Cart</h1>
      </div>

      <div className={styles.cartItems}>
        {cart.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={item.product.image}
              alt={item.product.name}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h3>{item.product.name}</h3>
              <p>${item.product.price}</p>
            </div>
            <div className={styles.quantityControls}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className={styles.itemTotal}>
              ${item.product.price * item.quantity}
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${getTotalPrice()}</span>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};
