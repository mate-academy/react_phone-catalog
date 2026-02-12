import React from 'react';
import styles from './Skeleton.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image}>
        <div
          className={`${styles.skeleton__space} ${styles['skeleton__space--image']}`}
        ></div>
      </div>
      <div className={styles.skeleton__content}>
        <div
          className={`${styles.skeleton__space} ${styles['skeleton__space--title']}`}
        ></div>
        <div
          className={`${styles.skeleton__space} ${styles['skeleton__space--price']}`}
        ></div>
        <div
          className={`${styles.skeleton__space} ${styles['skeleton__space--datas']}`}
        ></div>
        <div
          className={`${styles.skeleton__space} ${styles['skeleton__space--buttons']}`}
        ></div>
      </div>
    </div>
  );
};
