//#region imports
import { IconButtonSkeleton } from '../../../shared/components/IconButton';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './QuantityControlsSkeleton.module.scss';
//#endregion

export const QuantityControlsSkeleton = () => (
  <div className={baseStyles.quantity}>
    <IconButtonSkeleton />

    <SkeletonItem additionalClass={styles.quantityNumber} />

    <IconButtonSkeleton />
  </div>
);
