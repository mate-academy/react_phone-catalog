//#region imports
import { ButtonSkeleton } from '../../../shared/components/Button';
import { FavButtonSkeleton } from '../../../shared/components/FavButton';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './PurchaseBlockSkeleton.module.scss';
//#endregion

export const PurchaseBlockSkeleton = () => (
  <div className={baseStyles.purchaseBlock}>
    <div className={baseStyles.priceBox}>
      <SkeletonItem additionalClass={styles.currentPrice} />

      <SkeletonItem additionalClass={styles.fullPrice} />
    </div>

    <div className={baseStyles.buttons}>
      <ButtonSkeleton size="medium" />

      <FavButtonSkeleton size="medium" />
    </div>
  </div>
);
