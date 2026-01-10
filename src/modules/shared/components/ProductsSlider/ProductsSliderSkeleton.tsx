import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { Skeleton } from '../Skeleton';
import styles from './ProductsSlider.module.scss';

interface Props {
  count?: number;
}

export const ProductsSliderSkeleton: React.FC<Props> = ({ count = 4 }) => (
  <section className={styles.slider}>
    <div className={styles.header}>
      <Skeleton className={styles.titleSkeleton} />
      <div className={styles.arrows}>
        <Skeleton className={styles.arrowSkeleton} />
        <Skeleton className={styles.arrowSkeleton} />
      </div>
    </div>

    <div className={styles.row}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={`slider-skeleton-${index}`} />
      ))}
    </div>
  </section>
);
