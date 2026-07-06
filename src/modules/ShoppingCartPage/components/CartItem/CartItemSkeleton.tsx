//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { QuantityControlsSkeleton } from '../QuantityControls';
import baseStyles from './base.module.scss';
import styles from './CartItemSkeleton.module.scss';
//#endregion

export const CartItemSkeleton = () => {
  return (
    <div className={baseStyles.cartItem}>
      <div className={baseStyles.main}>
        <SkeletonItem additionalClass={styles.deleteBtn} />

        <SkeletonItem additionalClass={baseStyles.imgFrame} />

        <SkeletonItem additionalClass={styles.name} />
      </div>

      <div className={baseStyles.cost}>
        <QuantityControlsSkeleton />

        <SkeletonItem additionalClass={styles.price} />
      </div>
    </div>
  );
};
