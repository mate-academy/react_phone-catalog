import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../shared/hooks/useCart';
import { CartItem } from './CartItem/CartItem';
import { useState } from 'react';
import { Modal } from '../shared/components/Modal';

export const CartPage = () => {
  const { items, totalQuantity, totalAmount, clearCart } = useCart();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <div className={styles.back}>
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
            fill="currentColor"
          />
        </svg>
        <div onClick={() => navigate(-1)} className={styles.backLink}>
          <p className={styles.text}>Back</p>
        </div>
      </div>

      <h1 className={styles.sectionTitle}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.products}>
          {items.length ? (
            items.map(item => <CartItem key={item.id} item={item} />)
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className={styles.totalBlock}>
          <div className={styles.totalDescription}>
            <p className={styles.total}>${totalAmount.toFixed(2)}</p>
            <p className={styles.totalText}>Total for ${totalQuantity} items</p>
          </div>

          <button
            className={styles.buttonCheckout}
            onClick={() => setOpenModal(true)}
          >
            Checkout
          </button>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <p>Checkout is not implemented yet.</p>
        <p> Do you want to clear the Cart?</p>
        <div className={styles.modalButtons}>
          <button
            className={styles.modalCancelButton}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              clearCart();
              setOpenModal(false);
            }}
          >
            Clear
          </button>
        </div>
      </Modal>
    </div>
  );
};
