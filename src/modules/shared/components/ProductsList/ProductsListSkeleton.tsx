import { ProductCardSkeleton } from '../ProductCardSkeleton';
import styles from './ProductsList.module.scss';

interface Props {
  count?: number;
}

export const ProductsListSkeleton: React.FC<Props> = ({ count = 8 }) => (
  <div className={styles.grid}>
    {Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={`product-skeleton-${index}`} />
    ))}
  </div>
);
