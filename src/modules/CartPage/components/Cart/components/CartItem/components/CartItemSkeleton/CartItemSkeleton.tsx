import { Skeleton } from '@/shared/components/Skeleton';
import styles from './CartItemSkeleton.module.scss';
import { toRem } from '@/shared/utils/toRem';

export const CartItemSkeleton = () => {
  return (
    <div className={styles.cartItemSkeleton}>
      <div className={styles.details}>
        <div className={styles.IconButton}>
          <Skeleton width={toRem(16)} height={toRem(16)} />
        </div>

        <div className={styles.img}>
          <Skeleton width="100%" height="100%" />
        </div>

        <div className={styles.title}>
          <Skeleton width="100%" height={toRem(16)} />
          <Skeleton width="100%" height={toRem(16)} />
          <Skeleton width="100%" height={toRem(16)} />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.amountBlock}>
          <div className={styles.IconButton}>
            <Skeleton width={toRem(32)} height={toRem(32)} />
          </div>

          <div className={styles.number}>
            <Skeleton width={toRem(10)} height={toRem(15)} />
          </div>

          <div className={styles.IconButton}>
            <Skeleton width={toRem(32)} height={toRem(32)} />
          </div>
        </div>

        <div className={styles.price}>
          <Skeleton width={toRem(65)} height={toRem(31)} />
        </div>
      </div>
    </div>
  );
};
