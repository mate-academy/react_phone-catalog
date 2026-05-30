import React from 'react';
import styles from './ErrorMessage.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  onRetry: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorWrapper}>
      <p className={styles.message}>{t('error.somethingWentWrong')}</p>
      <button className={styles.retryButton} onClick={onRetry}>
        {t('error.retry')}
      </button>
    </div>
  );
};
