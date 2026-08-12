import { Skeleton } from '../Skeleton';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <article className={styles.card} aria-label="Loading product">
      <div className={styles.imageWrapper}>
        <Skeleton className={styles.image} />
      </div>

      <div className={styles.title}>
        <Skeleton className={styles.titleLine} />
        <Skeleton className={styles.titleLineShort} />
      </div>

      <div className={styles.price}>
        <Skeleton className={styles.priceDiscount} />
        <Skeleton className={styles.priceRegular} />
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <Skeleton className={styles.specName} />
          <Skeleton className={styles.specValue} />
        </div>

        <div className={styles.spec}>
          <Skeleton className={styles.specName} />
          <Skeleton className={styles.specValue} />
        </div>

        <div className={styles.spec}>
          <Skeleton className={styles.specName} />
          <Skeleton className={styles.specValue} />
        </div>
      </div>

      <div className={styles.actions}>
        <Skeleton className={styles.cartButton} />
        <Skeleton className={styles.favoriteButton} />
      </div>
    </article>
  );
};
