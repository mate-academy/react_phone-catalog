import { useEffect } from 'react';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { clearCart } from '../../../../features/cart/cartSlice';

import styles from './Modal.module.scss';

type Props = {
  onOpenModal: () => void;
};

export const Modal: React.FC<Props> = ({ onOpenModal }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(clearCart());
    onOpenModal();
  };

  const handleCancel = () => {
    onOpenModal();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenModal();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [onOpenModal]);

  return (
    <div className={styles.modalOverlay} onClick={onOpenModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.content}>
          <p>Checkout is not implemented yet. </p>
          <p className={styles.textAccent}>Do you want to clear the Cart?</p>
        </div>
        <div className={styles.actions}>
          <button
            className={classNames(styles.button, styles.confirmButton)}
            type="button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className={classNames(styles.button, styles.cancelButton)}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
