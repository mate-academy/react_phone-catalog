import CartItems from '../../components/CartItems';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { useState } from 'react';

export const CartPage = () => {
  const { items, increase, decrease, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCheckoutClick = () => setIsModalOpen(true);
  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className={styles.cartPage}>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="cart-item">
            <CartItems
              product={item.product}
              quantity={item.quantity}
              handleDecrease={() => decrease(item.id)}
              handleIncrease={() => increase(item.id)}
              handleRemoveFromCart={() => removeFromCart(item.id)}
            />
          </div>
        ))
      )}
      <button onClick={handleCheckoutClick}>Checkout</button>
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className={styles.modalActions}>
              <button onClick={handleConfirm} className={styles.confirm}>
                Yes
              </button>
              <button onClick={handleCancel} className={styles.cancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
