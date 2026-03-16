import styles from './Loader.module.scss';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

export const Loader = () => (
  <div className={styles.loader}>
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
