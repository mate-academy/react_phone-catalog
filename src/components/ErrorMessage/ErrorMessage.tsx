import React from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  onRetry: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className={styles.errorMessage}>
      <h3 className={styles.errorMessage__text}>Something went wrong...</h3>
      <button className={styles.errorMessage__button} onClick={onRetry}>
        Reload
      </button>
    </div>
  );
};
