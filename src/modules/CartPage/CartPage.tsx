import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } =
    useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <img src={item.product.image} alt={item.product.name} />
                <span>{item.product.name}</span>
              </div>
              <div className={styles.itemControls}>
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)}>x</button>
              </div>
            </div>
          ))}
          <div className={styles.summary}>
            <p>Total items: {totalQuantity}</p>
            <p>Total amount: ${totalAmount}</p>
          </div>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
