import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner} />
  </div>
);
