import React from 'react';
import styles from './Error.module.scss';

type Props = {
  error: string | null;
  reload: () => void;
};

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>{error}</p>
      <button className={styles.error__btn} onClick={reload}>
        Try again
      </button>
    </div>
  );
};
