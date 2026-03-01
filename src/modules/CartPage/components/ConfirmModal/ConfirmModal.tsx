import React from 'react';
import styles from './ConfirmModal.module.scss';

type ModalProps = {
  isOpen: boolean;
  text: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({
  isOpen,
  text,
  onConfirm,
  onClose,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <p className={styles.message}>{text}</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            Yes, clear cart
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
