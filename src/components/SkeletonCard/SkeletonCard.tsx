import { FC } from 'react';
import styles from './SkeletonCard.module.scss';

export const SkeletonCard: FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonPrice}></div>
      <div className={styles.skeletonDescription}></div>
      <div className={styles.skeletonDescription}></div>
      <div className={styles.skeletonDescription}></div>
      <div className={styles.skeletonButtons}></div>
    </div>
  );
};
