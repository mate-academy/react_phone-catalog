import styles from './ProductPageSkeleton.module.scss';
import { ProductCardSkeleton } from '../shared/ProductCard/ProductCardSkeleton';

export const ProductPageSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs} />

      <div className={styles.pageTitle} />

      <div className={styles.productsAmount} />

      <div className={styles.dropdowns}>
        <div className={styles.dropdownSort} />
        <div className={styles.dropdownPerPage} />
      </div>

      <ul className={styles.productList}>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className={styles.productCard}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>

      <div className={styles.pagination} />
    </div>
  );
};
