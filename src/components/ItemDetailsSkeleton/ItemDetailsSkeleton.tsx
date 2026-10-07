import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './ItemDetailsSkeleton.module.scss';

export const ItemDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['top-bar']}>
        <Skeleton width={180} height={16} />
      </div>
      <div className={styles.title}>
        <Skeleton width="60%" height={36} />
      </div>
      <div className={styles.grid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            <Skeleton width={60} height={60} />
            <Skeleton width={60} height={60} />
            <Skeleton width={60} height={60} />
            <Skeleton width={60} height={60} />
          </div>
          <div className={styles['main-image']}>
            <Skeleton height={380} />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles['section-block']}>
            <Skeleton width={100} height={14} />
            <div className={styles.row}>
              <Skeleton circle width={32} height={32} />
              <Skeleton circle width={32} height={32} />
              <Skeleton circle width={32} height={32} />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles['section-block']}>
            <Skeleton width={120} height={14} />
            <div className={styles.row}>
              <Skeleton width={64} height={32} />
              <Skeleton width={64} height={32} />
              <Skeleton width={64} height={32} />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles['price-row']}>
            <Skeleton width={110} height={36} />
            <Skeleton width={70} height={24} />
          </div>
          <div className={styles['button-row']}>
            <div style={{ flex: 1 }}>
              <Skeleton height={48} />
            </div>
            <div style={{ width: 48 }}>
              <Skeleton width={48} height={48} />
            </div>
          </div>
          <div className={styles['specs-list']}>
            <div className={styles['spec-item']}>
              <Skeleton width={70} height={14} />
              <Skeleton width={60} height={14} />
            </div>
            <div className={styles['spec-item']}>
              <Skeleton width={80} height={14} />
              <Skeleton width={90} height={14} />
            </div>
            <div className={styles['spec-item']}>
              <Skeleton width={60} height={14} />
              <Skeleton width={50} height={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
