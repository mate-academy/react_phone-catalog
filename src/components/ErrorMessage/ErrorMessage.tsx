import React from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  onReload: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onReload }) => (
  <div className={styles.errorWrapper}>
    <p className={styles.errorMessage}>Something went wrong</p>
    <button className={styles.reload} onClick={onReload}>
      Reload
    </button>
  </div>
);
