import { useTranslation } from 'react-i18next';

import styles from './CheckoutPage.module.scss';

type Props = {
  ttn: string;
  onContinue: () => void;
};

export const CheckoutSuccessModal = ({ ttn, onContinue }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.successModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-success-title"
      >
        <div className={styles.successIcon}>✓</div>
        <h2
          id="checkout-success-title"
          className={styles.successTitle}
        >
          {t('checkoutSuccessTitle')}
        </h2>
        <p className={styles.successText}>{t('checkoutSuccessText')}</p>
        <div className={styles.ttnBlock}>
          <span className={styles.ttnLabel}>
            {t('checkoutTrackingNumber')} (TTN)
          </span>
          <strong className={styles.ttnNumber}>{ttn}</strong>
        </div>
        <button
          type="button"
          className={styles.successButton}
          onClick={onContinue}
        >
          {t('checkoutContinueShopping')}
        </button>
      </div>
    </div>
  );
};
