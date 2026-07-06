//#region imports
import { ButtonSkeleton } from '../../../shared/components/Button';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './TotalSkeleton.module.scss';
//#endregion

export const TotalSkeleton = () => (
  <div className={baseStyles.total}>
    <div className={`${baseStyles.priceBox} ${styles.priceBox}`}>
      <SkeletonItem additionalClass={styles.price} />

      <SkeletonItem additionalClass={styles.totalItems} />
    </div>

    <hr className={baseStyles.breakLine} />

    <ButtonSkeleton size="medium" />
  </div>
);
