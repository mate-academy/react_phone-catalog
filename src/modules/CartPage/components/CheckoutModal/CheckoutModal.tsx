import { useCallback, useContext } from 'react';
import { CartContext, STORAGE_KEY } from '../../../../context/CartContext';
import styles from './CheckoutModal.module.scss';
import { Button } from '../../../shared/components/Button';

type Props = {
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const CheckoutModal: React.FC<Props> = ({ isOpen, setIsModalOpen }) => {
  const { clearCart } = useContext(CartContext);

  const handleConfirm = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    clearCart();
    setIsModalOpen(false);
  }, [clearCart, setIsModalOpen]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.checkoutModal} onClick={handleClose}>
      <div className={styles.checkoutModal__content} onClick={e => e.stopPropagation()}>
        <h2 className={styles.checkoutModal__title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h2>
        <div className={styles.checkoutModal__actions}>
          <Button option="secondary" onClick={handleClose} className={styles.button}>
            Cancel
          </Button>
          <Button option="primary" onClick={handleConfirm} className={styles.button}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
