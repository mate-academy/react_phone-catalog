import { Skeleton } from '@/shared/components/Skeleton';
import styles from './ProductCardSkeleton.module.scss';
import { toRem } from '@/shared/utils/toRem';
import { Divider } from '@/shared/components/Divider';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.img}>
        <Skeleton width="100%" height="100%" />
      </div>

      <div className={styles.title}>
        <Skeleton width="100%" height={toRem(19)} />
        <Skeleton width="75%" height={toRem(19)} />
      </div>

      <Skeleton width={toRem(130)} height={toRem(28)} />

      <Divider />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <Skeleton width={toRem(42)} height={toRem(15)} />
          <Skeleton width={toRem(37)} height={toRem(15)} />
        </div>

        <div className={styles.spec}>
          <Skeleton width={toRem(57)} height={toRem(15)} />
          <Skeleton width={toRem(30)} height={toRem(15)} />
        </div>

        <div className={styles.spec}>
          <Skeleton width={toRem(27)} height={toRem(15)} />
          <Skeleton width={toRem(24)} height={toRem(15)} />
        </div>
      </div>

      <div className={styles.buttons}>
        <Skeleton width="100%" height={toRem(40)} />
        <div className={styles.favoriteButton}>
          <Skeleton width={toRem(40)} height={toRem(40)} />
        </div>
      </div>
    </div>
  );
};
