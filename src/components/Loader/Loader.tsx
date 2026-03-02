import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader} role="status" aria-live="polite">
    <div className={styles.spinner} aria-hidden="true" />
    <span className={styles.srOnly}>Loading...</span>
  </div>
);
