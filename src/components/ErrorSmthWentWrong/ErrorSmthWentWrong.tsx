import React from 'react';
import styles from './ErrorSmthWentWrong.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorSmthWentWrong: React.FC<Props> = ({ onReload }) => {
  return (
    <div className={styles.error}>
      <p className={styles.error__text}>
        Something went wrong. Please try again.
      </p>
      <button className={styles.error__button} onClick={onReload}>
        Reload
      </button>
    </div>
  );
};
