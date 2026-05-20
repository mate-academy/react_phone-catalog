import { Skeleton } from '@/components/ui/Skeleton';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton height="200px" className={styles.imageWrapper} />
      <Skeleton height="24px" className={styles.title} />
      <Skeleton height="24px" width="80%" className={styles.title} />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Skeleton height="28px" width="60px" />
        <Skeleton height="28px" width="50px" />
      </div>
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Skeleton height="14px" />
        <Skeleton height="14px" />
        <Skeleton height="14px" />
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="40px" />
      </div>
    </div>
  );
};
