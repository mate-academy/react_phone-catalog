import styles from './CategorySkeleton.module.scss';

export const CategorySkeleton = () => {
  return (
    <div className={styles.category__container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className={styles.category__type} key={index}>
          <div className={styles.category__link}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__image} ${styles.pulsate}`}
            />
          </div>

          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__title} ${styles.pulsate}`}
          />

          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__models} ${styles.pulsate}`}
          />
        </div>
      ))}
    </div>
  );
};
