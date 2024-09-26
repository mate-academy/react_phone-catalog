import React from 'react';
import styles from './ErrorMessage.module.scss';
import { ErrorTypes } from '../../utils/ErrorTypes';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
      {onRetry && message === ErrorTypes.LOAD && <button className={styles.retryButton} onClick={onRetry}>Retry</button>}
    </div>
  );
};