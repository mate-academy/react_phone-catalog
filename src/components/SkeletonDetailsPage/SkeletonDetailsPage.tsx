import styles from './SkeletonDetailsPage.module.scss';

export const SkeletonDetailsPage = () => {
  return (
    <div className={styles['skeleton-details']}>
      <h2 className={styles['skeleton-details__title--loading']}></h2>
      <div className={styles['skeleton-details__box']}>
        <div className={styles['skeleton-details__slider-wrapper']}>
          <div className={styles['skeleton-details__slider--loading']}></div>
          <div
            id="skeleton-details-slider-pagination"
            className={styles['skeleton-details__pagination']}
          >
            <div className={styles['skeleton-details__thumb--loading']}></div>
            <div className={styles['skeleton-details__thumb--loading']}></div>
            <div className={styles['skeleton-details__thumb--loading']}></div>
            <div className={styles['skeleton-details__thumb--loading']}></div>
          </div>
        </div>
        <div className={styles['skeleton-details__characteristics']}>
          <div className={styles['skeleton-details__characteristics-box']}>
            <div className={styles['skeleton-details__content']}>
              <div className="skeleton-details__color-box">
                <div
                  className={
                    styles['skeleton-details__characteristics-title--loading']
                  }
                ></div>
                <div
                  className={styles['skeleton-details__characteristics-color']}
                >
                  <div
                    className={styles['skeleton-details__color--loading']}
                  ></div>
                  <div
                    className={styles['skeleton-details__color--loading']}
                  ></div>
                  <div
                    className={styles['skeleton-details__color--loading']}
                  ></div>
                </div>
              </div>
              <div
                className={styles['skeleton-details__identifier--loading']}
              ></div>
            </div>
          </div>
          <div
            className={styles['skeleton-details__characteristics-divider']}
          ></div>
          <div className={styles['skeleton-details__characteristics-box']}>
            <div
              className={
                styles['skeleton-details__characteristics-title--loading']
              }
            ></div>
            <div
              className={styles['skeleton-details__characteristics-capacity']}
            >
              <div
                className={styles['skeleton-details__capacity--loading']}
              ></div>
              <div
                className={styles['skeleton-details__capacity--loading']}
              ></div>
              <div
                className={styles['skeleton-details__capacity--loading']}
              ></div>
            </div>
          </div>
          <div
            className={styles['skeleton-details__characteristics-divider']}
          ></div>
          <div className={styles['skeleton-details__characteristics-price']}>
            <div
              className={styles['skeleton-details__price-new--loading']}
            ></div>
            <div
              className={styles['skeleton-details__price-old--loading']}
            ></div>
          </div>
          <div className={styles['skeleton-details__characteristics-link-box']}>
            <div className={styles['skeleton-details__btn--loading']}></div>
            <div className={styles['skeleton-details__fav--loading']}></div>
          </div>
          <div className={styles['skeleton-details__characteristics-descr']}>
            <div
              className={styles['skeleton-details__characteristics-descr-box']}
            >
              <div
                className={styles['skeleton-details__descr-title--loading']}
              ></div>
              <div
                className={styles['skeleton-details__descr-text--loading']}
              ></div>
            </div>
            <div
              className={styles['skeleton-details__characteristics-descr-box']}
            >
              <div
                className={styles['skeleton-details__descr-title--loading']}
              ></div>
              <div
                className={styles['skeleton-details__descr-text--loading']}
              ></div>
            </div>
            <div
              className={styles['skeleton-details__characteristics-descr-box']}
            >
              <div
                className={styles['skeleton-details__descr-title--loading']}
              ></div>
              <div
                className={styles['skeleton-details__descr-text--loading']}
              ></div>
            </div>
            <div
              className={styles['skeleton-details__characteristics-descr-box']}
            >
              <div
                className={styles['skeleton-details__descr-title--loading']}
              ></div>
              <div
                className={styles['skeleton-details__descr-text--loading']}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
