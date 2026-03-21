import React from 'react';
import styles from './CheckoutModal.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <p className={styles.message}>{t('cart.checkoutMessage')}</p>

        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            {t('cart.confirmClear')}
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            {t('cart.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
