import { Skeleton } from '@/modules/shared/components/Skeleton/Skeleton';
import styles from './SearchItemSkeleton.module.scss';

export const SearchItemSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton className={styles.imgSkeleton} />
      <div className={styles.titleWrapper}>
        <Skeleton className={styles.titleSkeleton} />
      </div>
      <Skeleton className={styles.priceSkeleton} />
    </div>
  );
};
