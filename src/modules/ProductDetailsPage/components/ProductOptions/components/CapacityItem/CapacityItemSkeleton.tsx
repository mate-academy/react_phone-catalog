//#region imports
import { SkeletonItem } from '../../../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './CapacityItemSkeleton.module.scss';
//#endregion

export const CapacityItemSkeleton = () => (
  <SkeletonItem
    additionalClass={`${baseStyles.capacityItem} ${styles.capacityItem}`}
  />
);
