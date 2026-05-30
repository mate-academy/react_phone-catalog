import React from 'react';
import styles from './modal.module.scss';
import { useDispatch } from 'react-redux';

import { clearCase } from '../../features/cart';

interface ModalProps {
  onClose: (value: boolean) => void;
  modal: boolean;
}
export const Modal: React.FC<ModalProps> = ({ onClose, modal }) => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCase());
    onClose(false);
  };

  return (
    <div className={`${styles.modal} ${modal ? styles.show : ''}`}>
      <div className={styles.modal_cont}>
        <p className={styles.modal_text}>
          Checkout is not implemented yet. Do you want to clear the Cart?:
        </p>
        <div className={styles.modal_buttons}>
          <button
            className={styles.modal_buy}
            onClick={() => handleClearCart()}
          >
            Yes, i want to sell my bud
          </button>
          <button
            className={styles.modal_cancel}
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
