import React from 'react';

import styles from './Skeleton.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.skeleton}>
        <div className={`${styles.pulse} ${styles.skeleton__header}`}>
          <div className={`${styles.pulse} ${styles.skeleton__circle}`}></div>
          <div className={`${styles.pulse} ${styles.skeleton__mini}`}></div>
        </div>
        <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
        <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
        <div className={`${styles.pulse} ${styles.skeleton__block}`}></div>
      </div>
    </div>
  );
};
