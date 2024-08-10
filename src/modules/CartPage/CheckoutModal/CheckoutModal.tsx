import React from 'react';
import styles from './CheckoutModal.module.scss';
import { useAppDispatch } from '../../../app/hooks';
import { cleanCart } from '../../../features/chosenItemsSlice';
import { setIsCheckoutModal } from '../../../features/booleanSlice';

export const CheckoutModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCancelButton = () => {
    dispatch(setIsCheckoutModal(false));
  };

  const confirm = () => {
    dispatch(cleanCart());
    dispatch(setIsCheckoutModal(false));
    localStorage.removeItem('cart');
    localStorage.removeItem('itemsQuantity');
  };

  return (
    <>
      <div onClick={handleCancelButton} className={styles.overlay}></div>

      <div className={styles.module}>
        <p className={styles.module__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={styles.module__buttons}>
          <button
            className={`${styles.blackButtonBase} ${styles.module__button}`}
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className={`${styles.blackButtonBase} ${styles.module__button}`}
            onClick={confirm}
          >
            Confirm and clear
          </button>
        </div>
      </div>
    </>
  );
};
