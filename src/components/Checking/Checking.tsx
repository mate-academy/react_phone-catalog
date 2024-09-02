import React, { useContext, useCallback } from 'react';
import styles from './Checking.module.scss';
import { CartContext } from '../../context/CartContext';

type Props = {
  open: boolean;
  setIsModalOpen: (v: boolean) => void;
};

export const CheckoutModal: React.FC<Props> = ({ open, setIsModalOpen }) => {
  const { updateCartItems } = useContext(CartContext);

  const confirmButton = useCallback((): void => {
    localStorage.removeItem('cartItem');
    updateCartItems([]);
    setIsModalOpen(false);
  }, [updateCartItems, setIsModalOpen]);

  const handleClose = useCallback((): void => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.container} onClick={handleClose}>
      <div className={styles.fill} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h2>
        <div className={styles.actions}>
          <button className={styles.confirmButton} onClick={confirmButton}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
