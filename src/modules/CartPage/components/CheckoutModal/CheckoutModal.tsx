import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import styles from './CheckoutModal.module.scss';

interface Props {
  onClose: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ onClose }) => {
  const { dispatch } = useCart();

  const handleConfirm = () => {
    dispatch({ type: 'CLEAR_CART' });
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__backdrop} onClick={onClose} />

      <div className={styles.modal__content}>
        <h2 className={styles.modal__title}>Checkout</h2>

        <p className={styles.modal__message}>
          Checkout is not implemented yet. Do you want to clear the cart?
        </p>

        <div className={styles.modal__actions}>
          <button className={styles.modal__button_secondary} onClick={onClose}>
            Cancel
          </button>

          <button
            className={styles.modal__button_primary}
            onClick={handleConfirm}
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};
