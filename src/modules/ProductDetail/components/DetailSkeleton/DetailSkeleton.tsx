import styles from './DetailSkeleton.module.scss';
import classNames from 'classnames';

export const DetailSkeleton = () => {
  return (
    <>
      <div className={classNames(styles.container, styles.product)}>
        <div
          className={classNames(styles.product__header, styles.skeleton)}
        ></div>

        <div className={styles.product__gallery}>
          <div
            className={classNames(
              styles.skeleton,
              styles.product__gallerySkeleton,
            )}
          ></div>
        </div>

        <div className={styles.product__mainInfo}>
          <div
            className={classNames(styles.skeleton, styles.product__colors)}
          ></div>
          <div
            className={classNames(styles.skeleton, styles.product__capacity)}
          ></div>

          <div className={classNames(styles.product__prices, styles.prices)}>
            <span
              className={classNames(styles.skeleton, styles.product__price)}
            ></span>
            <span
              className={classNames(styles.skeleton, styles.product__price)}
            ></span>
          </div>

          <div
            className={classNames(styles.skeleton, styles.product__buttons)}
          ></div>

          <section
            className={classNames(styles.product__shortInfo, styles.shortInfo)}
          >
            <article className={styles.shortInfo__block}>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__param)}
              ></span>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__info)}
              ></span>
            </article>
            <article className={styles.shortInfo__block}>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__param)}
              ></span>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__info)}
              ></span>
            </article>
            <article className={styles.shortInfo__block}>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__param)}
              ></span>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__info)}
              ></span>
            </article>
            <article className={styles.shortInfo__block}>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__param)}
              ></span>
              <span
                className={classNames(styles.skeleton, styles.shortInfo__info)}
              ></span>
            </article>
          </section>
        </div>

        <div className={styles.product__description}>
          <div
            className={classNames(
              styles.skeleton,
              styles.product__descriptionText,
            )}
          ></div>
          <div
            className={classNames(
              styles.skeleton,
              styles.product__descriptionText,
            )}
          ></div>
        </div>
      </div>
    </>
  );
};
