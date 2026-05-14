import React from 'react';
import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.confirmModal} onClick={onCancel}>
      <div
        className={styles.confirmModal__content}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <p className={styles.confirmModal__message}>{message}</p>
        <div className={styles.confirmModal__actions}>
          <button className={styles.confirmModal__confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.confirmModal__cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
