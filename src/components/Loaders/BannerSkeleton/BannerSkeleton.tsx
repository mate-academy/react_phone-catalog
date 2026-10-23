import styles from './BannerSkeleton.module.scss';

export const BannerSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__slider}>
        <div
          className={`${styles.container__slider__content} ${styles.pulsate}`}
        >
          <div className={styles.container__slider__content__info}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__top}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__top}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__title}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__subtitle}`}
            />
          </div>

          <div className={styles.container__slider__content__image}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__image}`}
            />
          </div>
        </div>

        <div className={styles.container__slider__bars}>
          <div className={styles.skeletonBlock__bar} />
          <div className={styles.skeletonBlock__bar} />
          <div className={styles.skeletonBlock__bar} />
        </div>
      </div>
    </div>
  );
};
