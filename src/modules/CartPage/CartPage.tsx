import React from 'react';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    removeFromCart,
    setQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={setQuantity}
              />
            ))}
          </ul>

          <div className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles.totalCount}>
              Total for {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
            </p>
            <button
              type="button"
              className={styles.checkoutButton}
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
