import React from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  onRetry: () => void;
  message?: string;
};

export const ErrorMessage: React.FC<Props> = ({
  onRetry,
  message = 'Something went wrong. Please try again later.',
}) => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>{message}</p>
      <button className={styles.error__button} onClick={onRetry} type="button">
        Try again
      </button>
    </div>
  );
};
