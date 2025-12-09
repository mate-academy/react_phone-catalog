import React from 'react';
import styles from './CustomModal.module.scss';

type CustomModalProps = {
  onClose?: () => void;
};

export const CustomModal: React.FC<CustomModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.customModal}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.customModal__header}>
          <h2 className={styles.customModal__title}>Checkout</h2>
          <button
            className={styles.customModal__closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.customModal__content}>
          <p className={styles.customModal__message}>
            We are not ready to checkout yet, but we are working on it!
          </p>
          <p className={styles.customModal__subMessage}>
            Thank you for your patience.
          </p>
        </div>
      </div>
    </div>
  );
};
