import React from 'react';
import styles from './Modal.module.scss';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const Modal: React.FC<Props> = ({ onConfirm, onCancel }) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <span className={styles.modalText}>
        Checkout is not implemented yet.
        <br />
        Do you want to clear the Cart?
      </span>

      <div className={styles.modalButtons}>
        <button className={styles.modalButton} onClick={onCancel}>
          Cancel
        </button>

        <button className={styles.modalButton} onClick={onConfirm}>
          Submit
        </button>
      </div>
    </div>
  </div>
);
