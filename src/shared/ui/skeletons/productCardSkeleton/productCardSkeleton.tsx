import { HeartIcon } from '@shared/icons';
import styles from './productCardSkeleton.module.scss';
import btns from '@entities/prodCard/styles/buttons.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <li className={styles.container} aria-hidden="true">
      <div className={styles['image-wrapper']}>
        <div className={styles.loader}>
          <svg
            viewBox="0 0 120 120"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={`${styles.load} ${styles.one}`}
              cx="60"
              cy="60"
              r="40"
            />
            <circle
              className={`${styles.load} ${styles.two}`}
              cx="60"
              cy="60"
              r="40"
            />
            <circle
              className={`${styles.load} ${styles.three}`}
              cx="60"
              cy="60"
              r="40"
            />
            <g>
              <circle
                className={`${styles.point} ${styles.one}`}
                cx="45"
                cy="70"
                r="5"
              />
              <circle
                className={`${styles.point} ${styles.two}`}
                cx="60"
                cy="70"
                r="5"
              />
              <circle
                className={`${styles.point} ${styles.three}`}
                cx="75"
                cy="70"
                r="5"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.name}></div>
      <div className={styles.price}></div>
      <div className={styles.spacer}></div>

      <div className={styles.descr}>
        <div className={styles.descr__type}>Screen</div>
        <div className={styles.descr__val} />

        <div className={styles.descr__type}>Capacity</div>
        <div className={styles.descr__val} />

        <div className={styles.descr__type}>RAM</div>
        <div className={styles.descr__val} />
      </div>
      <div className={btns.container}>
        <button disabled className={btns['cart-button']}>
          Add to cart
        </button>
        <button disabled className={btns['fav-button']}>
          <HeartIcon />
        </button>
      </div>
    </li>
  );
};
