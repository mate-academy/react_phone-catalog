import styles from './ErrorMessage.module.scss';

import React from 'react';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error}>
      <h1 className={styles.error__message}>{message}</h1>
      <button
        type="button"
        className={styles.error__reloadButton}
        onClick={handleReload}
      >
        TRY AGAIN
      </button>
    </div>
  );
};
