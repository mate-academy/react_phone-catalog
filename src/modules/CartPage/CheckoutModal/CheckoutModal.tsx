import React from 'react';
import styles from './CheckoutModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cleanCart } from '../../../features/chosenItemsSlice';
import { setIsCheckoutModal } from '../../../features/booleanSlice';

export const CheckoutModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const isModal = useAppSelector(state => state.boolean.isCheckoutModal);

  const handleCancelButton = () => {
    dispatch(setIsCheckoutModal(false));
  };

  const handleConfirmButton = () => {
    dispatch(cleanCart());
    dispatch(setIsCheckoutModal(false));
    localStorage.removeItem('cart');
    localStorage.removeItem('itemsQuantity');
  };

  if (!isModal) {
    return null;
  }

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
            onClick={handleConfirmButton}
          >
            Confirm and clear
          </button>
        </div>
      </div>
    </>
  );
};
