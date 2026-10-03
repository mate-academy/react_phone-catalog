import React from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  onReload: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ onReload }) => (
  <div className={styles.errorContainer}>
    <p className={styles.text}>Something went wrong</p>
    <button type="button" onClick={onReload} className={styles.reloadBtn}>
      Reload
    </button>
  </div>
);
