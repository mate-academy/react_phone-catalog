import React from 'react';
import styles from './CheckoutModal.module.scss';

interface Props {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ onClose, onClearCart }) => {
  return (
    <div className={styles.CheckoutModal}>
      <div className={styles.CheckoutModal__modal}>
        <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
        <div className={styles.CheckoutModal__buttons}>
          <button
            className={styles.CheckoutModal__button}
            onClick={onClearCart}
          >
            Yes, clear
          </button>
          <button
            className={styles.CheckoutModal__button}
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
