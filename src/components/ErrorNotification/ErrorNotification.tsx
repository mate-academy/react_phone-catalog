import React from 'react';
import useLanguageStore from '../../stores/useLanguageStore';
import styles from './ErrorNotification.module.scss';

interface ErrorNotificationProps {
  message?: string | null;
  onRetry?: () => void;
  title?: string;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  onRetry,
  title,
}) => {
  const { t } = useLanguageStore();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {title || t('something_went_wrong') || 'Something went wrong'}
      </h2>

      {message && <p className={styles.message}>{message}</p>}

      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry} type="button">
          {t('reload_button') || 'Try again'}
        </button>
      )}
    </div>
  );
};
