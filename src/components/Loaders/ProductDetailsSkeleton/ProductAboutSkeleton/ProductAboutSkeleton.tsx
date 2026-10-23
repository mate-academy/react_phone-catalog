export * from './ProductAboutSkeleton';

import styles from './ProductAboutSkeleton.module.scss';

export const ProductAboutSkeleton = () => {
  return (
    <section className={styles.about} aria-hidden="true">
      <div className={styles.about__title}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__title} ${styles.pulsate}`}
        />
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.about__block}>
          <div className={styles['about__block--subtitle']}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__subtitle} ${styles.pulsate}`}
            />
          </div>

          <div className={styles['about__block--details']}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__line} ${styles.pulsate}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__line} ${styles.pulsate}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__lineShort} ${styles.pulsate}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__lineShort} ${styles.pulsate}`}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
