import React from 'react';
import styles from './CustomModal.module.scss';
import { Button } from '@/components/ui/button/Button';

type CustomModalProps = {
  onClose?: () => void;
  onCheckout?: () => void;
  modalBody?: React.ReactNode;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  onClose,
  onCheckout,
  modalBody,
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.customModal} onClick={e => e.stopPropagation()}>
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
          {modalBody}
          <Button onClick={onCheckout} fullWidth >Checkout</Button>
        </div>
      </div>
    </div>
  );
};
