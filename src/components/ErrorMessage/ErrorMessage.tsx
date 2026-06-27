import React from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  message?: string;
  onReload?: () => void;
}

export const ErrorMessage: React.FC<Props> = ({
  message = 'Something went wrong',
  onReload,
}) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>{message}</h2>

      {onReload && (
        <button
          type="button"
          className={styles.error__button}
          onClick={onReload}
        >
          Reload
        </button>
      )}
    </div>
  );
};
