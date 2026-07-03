//#region imports
import { FC } from 'react';
import { SkeletonItem } from '../SkeletonItem';
import { ButtonSkeleton } from '../Button';
import { FavButtonSkeleton } from '../FavButton';
import baseStyles from './base.module.scss';
import styles from './ProductCardSkeleton.module.scss';
//#endregion

type Props = {
  withFullPrices?: boolean;
};

export const ProductCardSkeleton: FC<Props> = ({ withFullPrices = false }) => (
  <div className={baseStyles.card}>
    <div className={baseStyles.photoLink}>
      <SkeletonItem additionalClass={`${baseStyles.image} ${styles.image}`} />
    </div>

    <SkeletonItem additionalClass={styles.name} />

    <div className={baseStyles.prices}>
      <SkeletonItem additionalClass={styles.price} />

      {withFullPrices && <SkeletonItem additionalClass={styles.price} />}
    </div>

    <hr className={baseStyles.divider} />

    <ul className={baseStyles.characteristics}>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className={baseStyles.characteristic}>
          <SkeletonItem additionalClass={styles.characteristicName} />

          <SkeletonItem additionalClass={styles.characteristicValue} />
        </li>
      ))}
    </ul>

    <div className={baseStyles.actions}>
      <ButtonSkeleton />

      <FavButtonSkeleton />
    </div>
  </div>
);
