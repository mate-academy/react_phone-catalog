import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
    </div>
  );
};
