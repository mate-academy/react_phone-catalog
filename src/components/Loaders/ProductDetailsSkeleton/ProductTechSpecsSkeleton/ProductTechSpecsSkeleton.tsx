import styles from './ProductTechSpecsSkeleton.module.scss';

export const ProductTechSpecsSkeleton = () => {
  return (
    <section className={styles.techSpecs} aria-hidden="true">
      <div className={styles.techSpecs__title}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__title} ${styles.pulsate}`}
        />
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.techSpecs__block}>
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__type} ${styles.pulsate}`}
          />
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__value} ${styles.pulsate}`}
          />
        </div>
      ))}
    </section>
  );
};
