import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader} role="status" aria-label="Loading">
    <div className={styles.loader__spinner} />
  </div>
);
