import styles from './SkeletonGoodLayout.module.scss';
import classNames from 'classnames';

export const SkeletonGoodLayout = () => {
  return (
    <section className={styles.goodLayout}>
      {/* title */}
      <div className={classNames(styles.skeleton, styles.title)} />

      <div className={styles.main}>
        {/* main photo */}
        <div className={classNames(styles.skeleton, styles.photo)} />
        {/* gallery */}
        <div className={styles.gallery}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={classNames(styles.skeleton, styles.galleryItem)}
            />
          ))}
        </div>

        {/* info */}
        <div className={styles.info}>
          {/* price */}
          <div className={styles.prices}>
            <div className={classNames(styles.skeleton, styles.price)} />
            <div className={classNames(styles.skeleton, styles.priceSmall)} />
          </div>

          {/* buttons */}
          <div className={styles.actions}>
            <div className={classNames(styles.skeleton, styles.button)} />
            <div className={classNames(styles.skeleton, styles.button)} />
          </div>

          {/* fast specs */}
          <div className={styles.fastSpecs}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={classNames(styles.skeleton, styles.specRow)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* additional info */}
      <div className={styles.additional}>
        {/* about */}
        <div>
          <div className={classNames(styles.skeleton, styles.sectionTitle)} />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={classNames(styles.skeleton, styles.textLine)}
            />
          ))}
        </div>

        {/* tech specs */}
        <div>
          <div className={classNames(styles.skeleton, styles.sectionTitle)} />
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={classNames(styles.skeleton, styles.specRow)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
