import React from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Oops! Something went wrong</h2>
      <p className={styles.error__text}>{message}</p>
      <button
        type="button"
        className={styles.error__button}
        onClick={handleReload}
      >
        Try to refresh
      </button>
    </div>
  );
};
