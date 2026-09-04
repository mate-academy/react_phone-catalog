import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import { getImageUrl } from '../../constants';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalQuantity, totalPrice, clearCart } = useCart();
  const [showModal, setShowModal] = useState<boolean>(false);

  const confirmCheckout = () => {
    clearCart();
    setShowModal(false);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <img src={getImageUrl('img/cart-is-empty.png')} alt="Cart is empty" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItem key={item.product.itemId} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.total}>${totalPrice}</span>
            <span className={styles.count}>{totalQuantity} items</span>

            <button
              type="button"
              className={styles.checkout}
              onClick={() => setShowModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>

            <div className={styles.modalActions}>
              <button type="button" onClick={confirmCheckout}>
                Yes, clear
              </button>

              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
