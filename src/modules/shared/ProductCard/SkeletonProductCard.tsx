import React from 'react';
import styles from './SkeletonProductCard.module.scss';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.price}></div>
      <div className={styles.info}></div>
      <div className={styles.buttons}>
        <div className={styles.button_cart}></div>
        <div className={styles.button_like}></div>
      </div>
    </div>
  );
};
