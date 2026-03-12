import styles from './ProductCardSkeleton.module.scss';
import { Skeleton } from '../Skeleton/Skeleton';

export const ProductCardSkeleton = () => (
  <div className={styles.card}>
    <Skeleton height="160px" />
    <Skeleton height="54px" />
    <Skeleton height="31px" width="60%" />
    <Skeleton height="1px" />
    <div className={styles.specs}>
      <Skeleton height="14px" />
      <Skeleton height="14px" />
      <Skeleton height="14px" />
    </div>
    <div className={styles.bottom}>
      <Skeleton height="40px" />
      <Skeleton height="40px" width="40px" />
    </div>
  </div>
);
