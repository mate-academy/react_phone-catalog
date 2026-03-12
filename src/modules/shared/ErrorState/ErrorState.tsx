import React from 'react';
import styles from './ErrorState.module.scss';

type Props = {
  onRetry: () => void;
};

export const ErrorState: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className={styles.errorState}>
      <p className={styles.message}>Something went wrong</p>
      <button onClick={onRetry} className={styles.button}>
        Try again
      </button>
    </div>
  );
};
