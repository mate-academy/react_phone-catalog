//#region imports
import { ProductCardSkeleton } from '../ProductCard';
import { SkeletonItem } from '../SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './ProductListSkeleton.module.scss';
//#endregion

export const ProductListSkeleton = () => (
  <div className={baseStyles.productsListBlock}>
    <SkeletonItem additionalClass={styles.searchInput} />

    <ul className={baseStyles.productsList}>
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className={baseStyles.product}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  </div>
);
