import { FC } from 'react';
import styles from './CheckoutModal.module.css';

interface Props {
  closeModal: () => void;
  confirmOrder: () => void;
}

const CheckoutModal: FC<Props> = ({ closeModal, confirmOrder }) => (
  <div className={styles.modalOverlay} onClick={closeModal}>
    <div
      className={styles.modalContent}
      onClick={event => event.stopPropagation()}
    >
      <h2>Checkout</h2>
      <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
      <button
        className={`${styles.modalButton} ${styles.confirm}`}
        onClick={confirmOrder}
      >
        Confirm Order
      </button>
      <button
        className={`${styles.modalButton} ${styles.cancel}`}
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default CheckoutModal;
