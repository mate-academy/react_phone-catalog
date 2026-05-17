import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import type { StepPaymentProps } from '../CheckoutModal.types';

export const StepPayment: React.FC<StepPaymentProps> = ({
  styles,
  arrowDownIcon,
  paymentOpen,
  paymentMethod,
  loading,
  isStep3Valid,
  onTogglePayment,
  onSelectPaymentMethod,
  onSubmit,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.stepContent}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.dropdown__button}
          onClick={onTogglePayment}
        >
          {paymentMethod === 'card' ?
            t('checkout.card')
          : paymentMethod === 'paypal' ?
            'PayPal'
          : t('checkout.cod')}
          <span className={styles._arrow}>
            <img
              alt="arrow"
              src={arrowDownIcon}
            />
          </span>
        </button>

        {paymentOpen && (
          <div className={styles.dropdown__list}>
            <div
              className={styles.dropdown__item}
              onClick={() => onSelectPaymentMethod('card')}
            >
              {t('checkout.card')}
            </div>
            <div
              className={styles.dropdown__item}
              onClick={() => onSelectPaymentMethod('paypal')}
            >
              PayPal
            </div>
            <div
              className={styles.dropdown__item}
              onClick={() => onSelectPaymentMethod('cod')}
            >
              {t('checkout.cod')}
            </div>
          </div>
        )}
      </div>

      {paymentMethod === 'card' && (
        <div className={styles.cardFields}>
          <CardElement
            options={{ style: { base: { fontSize: '16px', color: '#fff' } } }}
          />
        </div>
      )}

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={onSubmit}
        disabled={loading || !isStep3Valid}
      >
        {loading ?
          t('checkout.processing')
        : paymentMethod === 'card' ?
          t('checkout.pay_order')
        : t('checkout.place_order')}
      </button>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={onBack}
        disabled={loading}
      >
        {t('checkout.back')}
      </button>
      <p className={styles.terms}>{t('checkout.terms')}</p>
    </div>
  );
};
