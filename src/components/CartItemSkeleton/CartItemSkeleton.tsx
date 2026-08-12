import { Skeleton } from '../Skeleton';
import styles from './CartItemSkeleton.module.scss';

export const CartItemSkeleton = () => {
  return (
    <article className={styles.item} aria-label="Loading cart item">
      <div className={styles.info}>
        <Skeleton className={styles.removeButton} />

        <Skeleton className={styles.image} />

        <div className={styles.titleWrapper}>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.titleShort} />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.quantity}>
          <Skeleton className={styles.quantityButton} />
          <Skeleton className={styles.quantityValue} />
          <Skeleton className={styles.quantityButton} />
        </div>

        <Skeleton className={styles.price} />
      </div>
    </article>
  );
};
