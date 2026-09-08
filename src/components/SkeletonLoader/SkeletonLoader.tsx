import styles from './SkeletonLoader.module.scss';

type Props = {
  count: number;
};

export const SkeletonLoader: React.FC<Props> = ({ count }) => {
  return (
    <div className="container">
      <div className={styles['skeleton-content']}>
        {[...Array(count)].map((_, i) => (
          <div className={styles['skeleton-card']} key={i}>
            <div className={styles['skeleton-card__img--loading']}></div>

            <div className={styles['skeleton-card__title--loading']}></div>

            <div className={styles['skeleton-card__price']}>
              <div
                className={styles['skeleton-card__new-price--loading']}
              ></div>
              <div
                className={styles['skeleton-card__old-price--loading']}
              ></div>
            </div>

            <div className={styles['skeleton-card__divider']}></div>

            <div className={styles['skeleton-card__descr']}>
              <div className={styles['skeleton-card__descr-box']}>
                <div
                  className={styles['skeleton-card__descr-title--loading']}
                ></div>
                <div
                  className={styles['skeleton-card__descr-text--loading']}
                ></div>
              </div>
              <div className={styles['skeleton-card__descr-box']}>
                <div
                  className={styles['skeleton-card__descr-title--loading']}
                ></div>
                <div
                  className={styles['skeleton-card__descr-text--loading']}
                ></div>
              </div>
              <div className={styles['skeleton-card__descr-box']}>
                <div
                  className={styles['skeleton-card__descr-title--loading']}
                ></div>
                <div
                  className={styles['skeleton-card__descr-text--loading']}
                ></div>
              </div>
            </div>

            <div className={styles['skeleton-card__link-box']}>
              <div className={styles['skeleton-card__btn--loading']}></div>
              <div className={styles['skeleton-card__fav--loading']}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
