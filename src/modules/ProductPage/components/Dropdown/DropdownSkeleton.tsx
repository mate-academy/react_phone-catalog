//#region imports
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './DropdownSkeleton.module.scss';
//#endregion

export const DropdownSkeleton = () => (
  <div className={baseStyles.dropdown}>
    <SkeletonItem additionalClass={styles.selectLabel} />

    <SkeletonItem additionalClass={`${baseStyles.select} ${styles.select}`} />
  </div>
);
