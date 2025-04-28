import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { clearCase } from '../../../app/reducers/cart';
import { XCircle, CheckCircle } from 'lucide-react';
import styles from './Modal.module.scss';

type Props = {
  onClose: (value: boolean) => void;
  isModal: boolean;
};

export const Modal: React.FC<Props> = ({ onClose, isModal }) => {
  const dispatch = useDispatch();

  const handleClearCart = useCallback(() => {
    dispatch(clearCase());
    onClose(false);
  }, [dispatch, onClose]);

  return (
    <div
      className={`${styles.overlay} ${isModal ? styles.show : ''}`}
      onClick={() => onClose(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <p className={styles.modal_message}>
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </p>
        <div className={styles.modal_buttonsContainer}>
          <button
            className={styles.confirm}
            onClick={handleClearCart}
            aria-label="Confirm clearing the cart"
          >
            <CheckCircle size={20} /> Yes, I confirm
          </button>
          <button
            className={styles.cancel}
            onClick={() => onClose(false)}
            aria-label="Cancel clearing the cart"
          >
            <XCircle size={20} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
