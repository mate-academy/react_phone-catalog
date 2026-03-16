import styles from './ProductDetailsSkeleton.module.scss';
import { Skeleton } from '../Skeleton/Skeleton';

export const ProductDetailsSkeleton = () => (
  <div className={styles.page}>
    <Skeleton height="12px" width="200px" className={styles.breadcrumbs} />
    <Skeleton height="12px" width="60px" className={styles.back} />
    <Skeleton height="32px" width="60%" className={styles.title} />

    <div className={styles.item}>
      {/* Gallery */}
      <div className={styles.gallery}>
        <div className={styles.thumbnails}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="50px" height="50px" />
          ))}
        </div>
        <Skeleton height="400px" />
      </div>

      {/* Options */}
      <div className={styles.options}>
        <Skeleton height="14px" width="120px" />
        <div className={styles.colors}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width="32px" height="32px" />
          ))}
        </div>
        <Skeleton height="14px" width="120px" />
        <div className={styles.capacity}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} width="64px" height="32px" />
          ))}
        </div>
        <Skeleton height="1px" />
        <Skeleton height="40px" width="120px" />
        <div className={styles.buttons}>
          <Skeleton height="48px" />
          <Skeleton width="48px" height="48px" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height="14px" />
        ))}
      </div>

      {/* About */}
      <div className={styles.about}>
        <Skeleton height="22px" width="80px" />
        <Skeleton height="1px" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="14px" />
        ))}
      </div>

      {/* Tech specs */}
      <div className={styles.techSpecs}>
        <Skeleton height="22px" width="100px" />
        <Skeleton height="1px" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height="14px" />
        ))}
      </div>
    </div>
  </div>
);
