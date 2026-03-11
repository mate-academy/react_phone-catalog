import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SuccessScreenProps } from '../CheckoutModal.types';

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  styles,
  successOrderId,
  onViewOrders,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.successScreen}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>{t('checkout.success_title')}</h2>
      <p className={styles.successText}>
        {t('checkout.success_text')}
        {successOrderId ? ` (#${successOrderId})` : ''}.
        <br />
        {t('checkout.redirecting')}
      </p>
      <div className={styles.successActions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={onViewOrders}
        >
          {t('checkout.view_orders')}
        </button>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={onClose}
        >
          {t('checkout.close')}
        </button>
      </div>
    </div>
  );
};
