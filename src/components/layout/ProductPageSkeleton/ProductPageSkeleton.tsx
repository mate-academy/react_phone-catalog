import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import styles from './ProductPageSkeleton.module.scss';

export const ProductPageSkeleton = () => {
  return (
    <div className={styles.page}>
      {/* заголовок */}
      <Skeleton height="32px" width="60%" className={styles.title} />

      {/* верхня секція */}
      <div className={styles.topSection}>
        {/* галерея */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                width="80px"
                height="80px"
                variant="rect"
                className={styles.thumbnail}
              />
            ))}
          </div>
          <Skeleton width="400px" height="400px" className={styles.mainImage} />
        </div>

        {/* інфо */}
        <div className={styles.info}>
          {/* id + кольори */}
          <div className={styles.colorsRow}>
            <Skeleton width="120px" height="12px" />
            <Skeleton width="60px" height="12px" />
          </div>
          <div className={styles.colors}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width="32px" height="32px" variant="circle" />
            ))}
          </div>

          <Skeleton height="1px" className={styles.divider} />

          {/* ємність */}
          <Skeleton width="100px" height="12px" className={styles.mb8} />
          <div className={styles.capacities}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="72px" height="38px" />
            ))}
          </div>

          <Skeleton height="1px" className={styles.divider} />

          {/* ціна */}
          <div className={styles.priceRow}>
            <Skeleton width="80px" height="32px" />
            <Skeleton width="60px" height="24px" />
          </div>

          {/* кнопки */}
          <div className={styles.actions}>
            <Skeleton height="48px" className={styles.btnMain} />
            <Skeleton
              width="48px"
              height="48px"
              variant="rect"
              className={styles.btnFav}
            />
          </div>

          {/* короткі характеристики */}
          <div className={styles.specs}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.specRow}>
                <Skeleton width="80px" height="12px" />
                <Skeleton width="100px" height="12px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* нижня секція */}
      <div className={styles.bottomSection}>
        {/* About */}
        <div className={styles.description}>
          <Skeleton width="80px" height="28px" className={styles.mb24} />
          <Skeleton height="1px" className={styles.divider} />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.descBlock}>
              <Skeleton width="50%" height="20px" className={styles.mb8} />
              <Skeleton height="14px" className={styles.mb4} />
              <Skeleton height="14px" width="90%" className={styles.mb4} />
              <Skeleton height="14px" width="80%" />
            </div>
          ))}
        </div>

        {/* Tech specs */}
        <div className={styles.techSpecs}>
          <Skeleton width="120px" height="28px" className={styles.mb24} />
          <Skeleton height="1px" className={styles.divider} />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.specRow}>
              <Skeleton width="100px" height="12px" />
              <Skeleton width="120px" height="12px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
