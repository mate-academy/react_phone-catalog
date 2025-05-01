import { PrimaryButton } from '@components/Buttons/PrimaryButton';

import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>Checkout</h2>
        <p className={styles.modal__message}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={styles.modal__actions}>
          <PrimaryButton mainText="Cancel" onClick={onClose} />
          <PrimaryButton mainText="Confirm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};
