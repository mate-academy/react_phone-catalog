import React from 'react';
import styles from './ModalDialog.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ModalDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{t('Checkout')}</h2>
        <p>{t('CheckoutMessage')}</p>
        <div className={styles.modalButtons}>
          <button
            className={classNames(
              styles.modalButton,
              styles.modalButtonConfirm,
            )}
            onClick={onConfirm}
          >
            {t('Confirm')}
          </button>
          <button
            className={classNames(styles.modalButton, styles.modalButtonCancel)}
            onClick={onClose}
          >
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
