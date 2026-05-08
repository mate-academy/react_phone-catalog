import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
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
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className={styles.emptyContainer}>
          <h1>Cart</h1>
          <p className={styles.empty}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <h1 className={styles.pageTitle}>Cart</h1>

      <div className={styles.cartContainer}>
        <div className={styles.cartItemsList}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fas fa-times"></i>
              </button>

              <img
                src={item.product.image}
                alt={item.product.name}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <h3>{item.product.name}</h3>
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

              <div className={styles.itemPrice}>${item.product.price}</div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.totalPrice}>${getTotalPrice()}</div>
          <div className={styles.totalText}>
            Total for {cart.length} item{cart.length !== 1 ? 's' : ''}
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
