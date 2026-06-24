import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './../ProductDetails.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        <Skeleton />
      </h1>

      <div className={styles.header}>
        <div className={styles.photos}>
          {[...Array(4)].map((_, index) => (
            <button key={index} type="button" className={styles.photos__button}>
              <Skeleton className={styles.photos__img} />
            </button>
          ))}
        </div>

        <div className={styles.preview}>
          <Skeleton className={styles.preview__img} />
        </div>

        <div className={styles.info}>
          <div className={styles.settings}>
            <div className={styles.details}>
              <p className={styles.details__title}>
                <Skeleton width={160} />
              </p>

              <div className={styles.details__group}>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className={styles.color}>
                    <Skeleton className={styles.color__label} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.details}>
              <p className={styles.details__title}>
                <Skeleton width={160} />
              </p>

              <div className={styles.details__group}>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={styles.capacity}>
                    <Skeleton className={styles.capacity__label} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.price}>
              <p className={styles.price__regular}>
                <Skeleton width={60} />
              </p>
              <p className={styles.price__discount}>
                <Skeleton width={60} />
              </p>
            </div>

            <div className={styles.buttons}>
              <Skeleton style={{ width: 260, height: 40 }} />
              <Skeleton style={{ width: 40, height: 40 }} />
            </div>
          </div>

          <ul className={styles.specs}>
            {[...Array(4)].map((_, index) => (
              <li key={index} className={styles.specs__item}>
                <Skeleton style={{ width: 80 }} />
                <span className={styles.specs__item_descr}>
                  <Skeleton style={{ width: 120 }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.about}>
        <div className={styles.about__block}>
          <h2 className={styles.about__title}>
            <Skeleton />
          </h2>

          {[...Array(2)].map((_, index) => (
            <div key={index} className={styles.about__group}>
              <h3 className={styles.about__subtitle}>
                <Skeleton />
              </h3>

              {[...Array(2)].map((__, i) => (
                <p key={i} className={styles.about__text}>
                  <Skeleton />
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.about__tech}>
          <h2 className={styles.about__title}>
            <Skeleton />
          </h2>

          <ul className={styles.about__list}>
            {[...Array(6)].map((_, index) => (
              <li key={index} className={styles.about__list_item}>
                <Skeleton style={{ width: 100 }} />
                <span className={styles.about__list_span}>
                  <Skeleton style={{ width: 120 }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
