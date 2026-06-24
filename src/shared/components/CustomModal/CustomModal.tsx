import React from 'react';
import styles from './CustomModal.module.scss';
import { Button } from '@/shared/ui/button/Button';

type CustomModalProps = {
  onClose?: () => void;
  onSubmit?: () => void;
  modalBody?: React.ReactNode;
  submitText?: string;
  modalTitle?: string;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  onClose,
  onSubmit,
  modalBody,
  submitText,
  modalTitle,
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.customModal} onClick={e => e.stopPropagation()}>
        <div className={styles.customModal__header}>
          <h2 className={styles.customModal__title}>{modalTitle}</h2>
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
          {submitText && <Button onClick={onSubmit}>{submitText}</Button>}
        </div>
      </div>
    </div>
  );
};
