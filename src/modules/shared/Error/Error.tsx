import React from 'react';
import styles from './Error.module.scss';

type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

export const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className={styles.error}>
      <p className={styles.error__message}>{message}</p>
      {onRetry && (
        <button className={styles.error__retryButton} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};
