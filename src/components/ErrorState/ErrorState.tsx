import React from 'react';
import styles from './ErrorState.module.scss';

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<Props> = ({ message, onRetry }) => (
  <div className={styles.errorState}>
    <h3 className={styles.errorState__title}>{message}</h3>
    <button className={styles.errorState__button} onClick={onRetry}>
      Reload
    </button>
  </div>
);
