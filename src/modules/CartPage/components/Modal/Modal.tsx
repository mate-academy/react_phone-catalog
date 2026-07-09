import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { Button } from '../../../../components/Button';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.title}>Checkout is not implemented yet.</h3>
        <p className={styles.text}>Do you want to clear the Cart?</p>

        <div className={styles.buttonBlock}>
          <Button variant="primary" onClick={onConfirm} className={styles.clearBtn}>
            Clear the Cart
          </Button>
          <Button variant="primary" onClick={onCancel} className={styles.keepBtn}>
            Keep the Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
