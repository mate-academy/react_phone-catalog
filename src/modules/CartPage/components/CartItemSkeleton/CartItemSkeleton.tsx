import { Skeleton } from '@/modules/shared/components/Skeleton';
import styles from './CartItemSkeleton.module.scss';
import { CiImageOn } from 'react-icons/ci';

export const CartItemSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.mainContent}>
        <Skeleton className={styles.removeBtn} />

        <Skeleton className={styles.preview}>
          <CiImageOn size={32} />
        </Skeleton>

        <Skeleton className={styles.title} />
      </div>
      <div className={styles.actions}>
        <Skeleton className={styles.counter} />
        <Skeleton className={styles.price} />
      </div>
    </article>
  );
};
