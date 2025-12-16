import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className={styles.overlay} data-testid="loader">
      <div className={styles.loaderBox}>
        <div className={styles.spinner}></div>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
};

export default Loader;
