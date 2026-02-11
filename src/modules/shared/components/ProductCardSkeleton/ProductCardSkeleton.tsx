import { Skeleton } from '../Skeleton';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => (
  <div className={styles.card}>
    <Skeleton className={styles.image} />
    <Skeleton className={styles.title} />
    <div className={styles.prices}>
      <Skeleton className={styles.price} />
      <Skeleton className={styles.fullPrice} />
    </div>
    <div className={styles.meta}>
      <div className={styles.metaRow}>
        <Skeleton className={styles.metaLabel} />
        <Skeleton className={styles.metaValue} />
      </div>
      <div className={styles.metaRow}>
        <Skeleton className={styles.metaLabel} />
        <Skeleton className={styles.metaValue} />
      </div>
      <div className={styles.metaRow}>
        <Skeleton className={styles.metaLabel} />
        <Skeleton className={styles.metaValue} />
      </div>
    </div>
    <div className={styles.actions}>
      <Skeleton className={styles.cartButton} />
      <Skeleton className={styles.favButton} />
    </div>
  </div>
);
