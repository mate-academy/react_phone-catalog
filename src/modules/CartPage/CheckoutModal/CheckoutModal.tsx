import React from 'react';
import styles from './CheckoutModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cleanCart } from '../../../features/chosenItemsSlice';
import { setIsCheckoutModal } from '../../../features/booleanSlice';
import { useTranslation } from 'react-i18next';

export const CheckoutModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isDark = useAppSelector(state => state.boolean.isDark);

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
        <p className={styles.module__text}>{t('checkout_message')}</p>
        <div className={styles.module__buttons}>
          <button
            className={`${styles.blackButtonBase} ${styles.module__button} ${isDark && styles.buttonDark}`}
            onClick={handleCancelButton}
          >
            {t('cancel')}
          </button>
          <button
            className={`${styles.blackButtonBase} ${styles.module__button} ${isDark && styles.buttonDark}`}
            onClick={confirm}
          >
            {t('confirm_checkout')}
          </button>
        </div>
      </div>
    </>
  );
};
