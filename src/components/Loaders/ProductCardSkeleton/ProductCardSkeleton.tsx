export * from './ProductCardSkeleton';

import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__image}>
        <div className={`${styles.skeletonBlock} ${styles.pulsate}`} />
      </div>

      <div className={styles.productCard__name}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__title} ${styles.pulsate}`}
        />
      </div>

      <div className={styles.productCard__price}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__price} ${styles.pulsate}`}
        />
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__fullPrice} ${styles.pulsate}`}
        />
      </div>

      <div className={styles.productCard__horizontalBar} />

      <div className={styles.productCard__info}>
        <div className={styles.productCard__infoItem}>
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__label} ${styles.pulsate}`}
          />
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__value} ${styles.pulsate}`}
          />
        </div>

        <div className={styles.productCard__infoItem}>
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__label} ${styles.pulsate}`}
          />
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__value} ${styles.pulsate}`}
          />
        </div>

        <div className={styles.productCard__infoItem}>
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__label} ${styles.pulsate}`}
          />
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__value} ${styles.pulsate}`}
          />
        </div>
      </div>

      <div className={styles.productCard__buttons}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__buttonMain} ${styles.pulsate}`}
        />
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__buttonFav} ${styles.pulsate}`}
        />
      </div>
    </div>
  );
};
