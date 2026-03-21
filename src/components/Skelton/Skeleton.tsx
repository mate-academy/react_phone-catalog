import React from 'react';
import styles from './Skeleton.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image} />
      <div className={styles.skeleton__title} />
      <div className={styles.skeleton__price} />
      <div className={styles.skeleton__divider} />
      <div className={styles.skeleton__specs}>
        <div className={styles.skeleton__specRow} />
        <div className={styles.skeleton__specRow} />
        <div className={styles.skeleton__specRow} />
      </div>
      <div className={styles.skeleton__buttons} />
    </div>
  );
};
