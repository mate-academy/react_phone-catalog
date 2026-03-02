import React from 'react';
import { useTranslation } from 'react-i18next';
import type { StepDetailsProps } from '../CheckoutModal.types';

const PHONE_PREFIX = '+380';

export const StepDetails: React.FC<StepDetailsProps> = ({
  styles,
  fullName,
  phone,
  isStep1Valid,
  onFullNameChange,
  onPhoneChange,
  onContinue,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.stepContent}>
      <input
        className={styles.input}
        placeholder={t('checkout.full_name')}
        value={fullName}
        maxLength={60}
        onChange={(e) => {
          const cleaned = e.target.value
            .replace(/[^a-zA-Z\u00C0-\u024F\u0400-\u04FF' -]/g, '')
            .replace(/\s{2,}/g, ' ')
            .slice(0, 30);
          onFullNameChange(cleaned);
        }}
      />

      <input
        className={styles.input}
        placeholder="+380XXXXXXXXX"
        value={phone}
        inputMode="tel"
        maxLength={13}
        onFocus={() => {
          if (!phone) onPhoneChange(PHONE_PREFIX);
        }}
        onChange={(e) => {
          let value = e.target.value;
          if (!value.startsWith(PHONE_PREFIX)) value = PHONE_PREFIX;
          const suffix = value
            .slice(PHONE_PREFIX.length)
            .replace(/\D/g, '')
            .slice(0, 9);
          onPhoneChange(PHONE_PREFIX + suffix);
        }}
      />

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={onContinue}
        disabled={!isStep1Valid}
      >
        {t('checkout.continue')}
      </button>
    </div>
  );
};
