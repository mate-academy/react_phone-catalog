import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCase } from '../../../app/reducers/cart';
import { XCircle, CheckCircle } from 'lucide-react';
import styles from './ModalWindow.module.scss';

type Props = {
  isModal: boolean;
  onClose: (value: boolean) => void;
};

export const ModalWindow: React.FC<Props> = ({ onClose, isModal }) => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const handleConfirmClearCart = useCallback(() => {
    dispatch(clearCase());
    handleClose();
  }, [dispatch, handleClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModal, handleClose]);

  if (!isModal) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${styles.show}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <p className={styles.modal_message}>
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </p>

        <div className={styles.modal_buttonsContainer}>
          <button
            type="button"
            className={styles.confirm}
            onClick={handleConfirmClearCart}
            aria-label="Confirm clearing the cart"
          >
            <CheckCircle size={20} />
            <span>Yes, I confirm</span>
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={handleClose}
            aria-label="Cancel clearing the cart"
          >
            <XCircle size={20} />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
