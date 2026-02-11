import { ProductsListSkeleton } from '../../../shared/components/ProductsList';
import { Skeleton } from '../../../shared/components/Skeleton';
import styles from './CatalogSkeleton.module.scss';

interface Props {
  perPage: number | 'all';
}

const FALLBACK_COUNT = 8;

export const CatalogSkeleton: React.FC<Props> = ({ perPage }) => {
  const count = perPage === 'all' ? FALLBACK_COUNT : perPage;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.titles}>
          <Skeleton className={styles.heading} />
          <Skeleton className={styles.caption} />
        </div>
        <div className={styles.controls}>
          <Skeleton className={styles.select} />
          <Skeleton className={styles.select} />
        </div>
      </div>

      <ProductsListSkeleton count={count} />

      <div className={styles.pagination}>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={`page-skeleton-${index}`} className={styles.page} />
        ))}
      </div>
    </div>
  );
};
