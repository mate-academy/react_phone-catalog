import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.itemCard}>
        <div className={`${styles.skeleton__breadcrumbs} ${styles.box}`} />
        <div className={`${styles.skeleton__backBtn} ${styles.box}`} />
        <div className={`${styles.skeleton__title} ${styles.box}`} />

        <div className={styles.itemCard__main}>
          <div className={styles.itemCard__gallery}>
            <div className={styles.skeleton__thumbnails}>
              <div className={`${styles.skeleton__thumb} ${styles.box}`} />
              <div className={`${styles.skeleton__thumb} ${styles.box}`} />
              <div className={`${styles.skeleton__thumb} ${styles.box}`} />
              <div className={`${styles.skeleton__thumb} ${styles.box}`} />
            </div>
            <div className={`${styles.skeleton__mainImage} ${styles.box}`} />
          </div>

          <div className={styles.itemCard__actions}>
            <div
              className={`${styles.skeleton__line} ${styles.box}`}
              style={{ width: '30%', height: '14px' }}
            />

            <div className={styles.skeleton__colors}>
              <div className={styles.box} />
              <div className={styles.box} />
              <div className={styles.box} />
              <div className={styles.box} />
            </div>

            <div className={styles.itemCard__divider} />

            <div
              className={`${styles.skeleton__line} ${styles.box}`}
              style={{ width: '35%', height: '14px' }}
            />

            <div className={styles.skeleton__capacities}>
              <div className={styles.box} />
              <div className={styles.box} />
              <div className={styles.box} />
            </div>

            <div className={styles.itemCard__divider} />

            <div
              className={`${styles.skeleton__line} ${styles.box}`}
              style={{ width: '40%', height: '36px' }}
            />

            <div className={styles.skeleton__buttons}>
              <div className={styles.box} />
              <div className={styles.box} />
            </div>

            <div className={styles.skeleton__specs}>
              <div className={styles.box} />
              <div className={styles.box} />
              <div className={styles.box} />
              <div className={styles.box} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
