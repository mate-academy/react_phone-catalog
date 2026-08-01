import { Skeleton } from '@shared/components/Skeleton';
import styles from './ProductDetailsSkeleton.module.scss';

const THUMBNAILS = [0, 1, 2, 3, 4];
const SPEC_ROWS = [0, 1, 2, 3];

export const ProductDetailsSkeleton = () => (
  <div className={styles.skeleton} aria-hidden="true">
    <Skeleton height="16px" width="120px" />
    <Skeleton height="41px" width="60%" className={styles.title} />

    <div className={styles.top}>
      <div className={styles.gallery}>
        <div className={styles.thumbnails}>
          {THUMBNAILS.map(thumbnail => (
            <Skeleton key={thumbnail} height="80px" width="80px" />
          ))}
        </div>

        <Skeleton height="440px" className={styles.mainPhoto} />
      </div>

      <div className={styles.controls}>
        <Skeleton height="15px" width="100px" />
        <Skeleton height="32px" width="180px" className={styles.row} />

        <Skeleton height="15px" width="100px" />
        <Skeleton height="32px" width="220px" className={styles.row} />

        <Skeleton height="41px" width="150px" className={styles.row} />

        <div className={styles.buttons}>
          <Skeleton height="48px" />
          <Skeleton height="48px" width="48px" isRound />
        </div>

        {SPEC_ROWS.map(row => (
          <Skeleton key={row} height="15px" />
        ))}
      </div>
    </div>

    <div className={styles.details}>
      <div className={styles.column}>
        <Skeleton height="31px" width="140px" />
        <Skeleton height="21px" className={styles.row} />
        <Skeleton height="21px" />
        <Skeleton height="21px" width="80%" />
      </div>

      <div className={styles.column}>
        <Skeleton height="31px" width="140px" />

        {SPEC_ROWS.map(row => (
          <Skeleton key={row} height="21px" className={styles.row} />
        ))}
      </div>
    </div>
  </div>
);
