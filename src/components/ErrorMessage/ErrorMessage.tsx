import React from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  message?: string;
  onReload?: () => void;
};

export const ErrorMessage: React.FC<Props> = ({
  message = 'Something went wrong',
  onReload,
}) => {
  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.error}>
      <p className={styles.error__text}>{message}</p>
      <button className={styles.error__button} onClick={handleReload}>
        Reload
      </button>
    </div>
  );
};
