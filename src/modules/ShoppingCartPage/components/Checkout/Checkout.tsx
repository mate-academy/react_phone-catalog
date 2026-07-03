//#region imports
import { Button } from '../../../shared/components/Button';
import { clear } from '../../../../store/slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../store/hooks';
import { CloseIcon } from '../../../shared/components/CloseIcon';
import { useModalDialog } from './hooks/useModalDialog';
import styles from './Checkout.module.scss';
//#endregion

export const Checkout = () => {
  const dispatch = useAppDispatch();

  const { dialogRef, open, close } = useModalDialog();

  const { t } = useTranslation('cart');

  const handleConfirm = () => {
    close();
    dispatch(clear());
  };

  return (
    <>
      <Button name={t('checkout')} size="medium" onClick={open} />

      <dialog
        ref={dialogRef}
        className={styles.modalDialog}
        aria-labelledby="dialog-text"
      >
        <button
          className={styles.closeBtn}
          onClick={close}
          aria-label={t('close')}
        >
          <CloseIcon type="delete" />
        </button>

        <div className={styles.text} id="dialog-text">
          {t('dialogText')}
        </div>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleConfirm}>
            {t('confirm')}
          </button>

          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={close}
          >
            {t('cancel')}
          </button>
        </div>
      </dialog>
    </>
  );
};
