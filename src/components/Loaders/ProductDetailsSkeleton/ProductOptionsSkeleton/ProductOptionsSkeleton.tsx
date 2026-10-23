import styles from './ProductOptionsSkeleton.module.scss';

export const ProductOptionsSkeleton = () => {
  return (
    <section className={styles.options} aria-hidden="true">
      <div className={styles.options__colorsBox}>
        <div className={styles['options__colorsBox--text']}>
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__label} ${styles.pulsate}`}
          />
          <div
            className={`${styles.skeletonBlock} ${styles.skeletonBlock__id} ${styles.pulsate}`}
          />
        </div>

        <div className={styles['options__colorsBox--colors']}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__color} ${styles.pulsate}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.options__bar} />

      <div className={styles.options__capacityBox}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__label} ${styles.pulsate}`}
        />

        <div className={styles['options__capacityBox--capacities']}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__capacity} ${styles.pulsate}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.options__bar} />

      <div className={styles.options__price}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__price} ${styles.pulsate}`}
        />
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__fullPrice} ${styles.pulsate}`}
        />
      </div>

      <div className={styles.options__buttons}>
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__buttonMain} ${styles.pulsate}`}
        />
        <div
          className={`${styles.skeletonBlock} ${styles.skeletonBlock__buttonFav} ${styles.pulsate}`}
        />
      </div>

      <div className={styles.options__specs}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles['options__specs--box']}>
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__specLabel} ${styles.pulsate}`}
            />
            <div
              className={`${styles.skeletonBlock} ${styles.skeletonBlock__specValue} ${styles.pulsate}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
