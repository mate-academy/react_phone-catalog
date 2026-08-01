import { Skeleton } from '@shared/components/Skeleton';
import styles from './ProductsListSkeleton.module.scss';

interface Props {
  /** How many placeholder cards to draw while the real ones load. */
  count?: number;
}

const SPEC_ROWS = [0, 1, 2];

export const ProductsListSkeleton: React.FC<Props> = ({ count = 8 }) => (
  <ul className={styles.list} aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className={styles.item}>
        <div className={styles.card}>
          <Skeleton height="196px" className={styles.photo} />
          <Skeleton height="21px" />
          <Skeleton height="21px" width="70%" />
          <Skeleton height="31px" width="50%" className={styles.price} />

          <span className={styles.divider} />

          {SPEC_ROWS.map(row => (
            <Skeleton key={row} height="15px" />
          ))}

          <div className={styles.buttons}>
            <Skeleton height="40px" />
            <Skeleton height="40px" width="40px" isRound />
          </div>
        </div>
      </li>
    ))}
  </ul>
);
