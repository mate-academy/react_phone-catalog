import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  isLoading: boolean;
  hasError: boolean;
  onReload: () => void;
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading,
  hasError,
  onReload,
}) => {
  if (hasError) {
    return (
      <div className={styles.Loader}>
        <div className={styles.Loader__error}>
          <p>Something went wrong. Please try again.</p>
          <button onClick={onReload} className={styles.Loader__reloadButton}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.Loader}>
        <div className={styles.Loader__spinner}></div>
      </div>
    );
  }

  return null;
};
