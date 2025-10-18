import { HeartIcon } from '@shared/icons';
import styles from './productCardSkeleton.module.scss';
import btns from '@entities/prodCard/styles/buttons.module.scss';
import { LoaderSpinner } from '../loaderSpinner/loaderSpinner';

export const ProductCardSkeleton = () => {
  return (
    <li className={styles.container} aria-hidden="true">
      <LoaderSpinner />
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
