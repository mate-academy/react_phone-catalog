import React from 'react';
import styles from './ModalDialog.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className="body-text">
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </p>

        <div className={`button-text ${styles.buttons}`}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Yes, clear
          </button>

          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
