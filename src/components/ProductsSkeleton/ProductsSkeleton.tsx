import { Loader } from '../Loader';
import { Skeleton } from '../Skeleton';
import styles from './ProductsSkeleton.module.scss';

interface ProductsSkeletonProps {
  count?: number;
  layout?: 'grid' | 'slider';
}

export const ProductsSkeleton = ({
  count = 4,
  layout = 'grid',
}: ProductsSkeletonProps) => (
  <div>
    <Loader compact />

    <div className={layout === 'slider' ? styles.slider : styles.grid}>
      {Array.from({ length: count }, (_, index) => (
        <div className={styles.card} key={index}>
          <Skeleton className={styles.image} />
          <Skeleton className={styles.title} variant="text" />
          <Skeleton className={styles.shortTitle} variant="text" />
          <Skeleton className={styles.price} variant="text" />
          <Skeleton className={styles.divider} />

          <div className={styles.specs}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>

          <div className={styles.actions}>
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  </div>
);
