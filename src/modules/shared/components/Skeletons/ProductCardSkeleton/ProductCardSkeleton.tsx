import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div
        className={`${styles.skeletonCard__box} ${styles.skeletonCard__image}`}
      />
      <div
        className={`${styles.skeletonCard__box} ${styles.skeletonCard__title}`}
      />
      <div
        className={`${styles.skeletonCard__box} ${styles.skeletonCard__price}`}
      />
      <div className={styles.skeletonCard__divider} />

      <div className={styles.skeletonCard__specs}>
        <div
          className={`${styles.skeletonCard__box} ${styles.skeletonCard__specRow}`}
        />
        <div
          className={`${styles.skeletonCard__box} ${styles.skeletonCard__specRow}`}
        />
        <div
          className={`${styles.skeletonCard__box} ${styles.skeletonCard__specRow}`}
        />
      </div>

      <div className={styles.skeletonCard__buttons}>
        <div
          className={`${styles.skeletonCard__box} ${styles.skeletonCard__btnCart}`}
        />
        <div
          className={`${styles.skeletonCard__box} ${styles.skeletonCard__btnFav}`}
        />
      </div>
    </div>
  );
};
