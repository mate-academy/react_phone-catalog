import styles from './ProductImagesSkeleton.module.scss';

export const ProductImagesSkeleton = () => {
  return (
    <section className={styles.images} aria-hidden="true">
      <div className={styles.images__principal}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__principal} ${styles.pulsate}`}
        />
      </div>

      <div className={styles.images__secundary}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__thumb} ${styles.pulsate}`}
          />
        ))}
      </div>
    </section>
  );
};
