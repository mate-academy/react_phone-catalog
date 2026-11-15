import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.scss';
import { CartItem } from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import chevronIcon from '../../img/icons/Chevron (Arrow Right).svg';

export const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <img src={chevronIcon} alt="" className={styles.backIcon} />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {items.length === 0 && (
          <p className={styles.empty}>Your cart is empty</p>
        )}
        {items.length > 0 && (
          <div className={styles.content}>
            <ul className={styles.list}>
              {items.map(item => (
                <li key={item.id}>
                  <CartItem
                    item={item}
                    onRemove={removeFromCart}
                    onQuantityChange={updateQuantity}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <p className={styles.total}>${totalPrice}</p>
              <p className={styles.totalLabel}>
                Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </p>
              <button
                type="button"
                className={styles.checkoutButton}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
              {isModalOpen && (
                <div className={styles.overlay}>
                  <div
                    className={styles.modal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                  >
                    <p id="modal-title" className={styles.modalText}>
                      Checkout is not implemented yet. Do you want to clear the
                      Cart?
                    </p>

                    <div className={styles.modalActions}>
                      <button
                        type="button"
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>

                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
