import { ImgIcon } from '../../Icon/ImgIcon';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <ImgIcon />
      </div>

      <div className={`${styles.title} ${styles.pulsate}`} />

      <hr className={styles.line} />

      <div className={styles.description}>
        <div className={styles.description__name}>
          <div className={`${styles.description__item} ${styles.pulsate}`} />
          <div className={`${styles.description__item} ${styles.pulsate}`} />
          <div className={`${styles.description__item} ${styles.pulsate}`} />
        </div>

        <div className={styles.description__value}>
          <div className={`${styles.description__item} ${styles.pulsate}`} />
          <div className={`${styles.description__item} ${styles.pulsate}`} />
          <div className={`${styles.description__item} ${styles.pulsate}`} />
        </div>
      </div>

      <div className={styles.buttons_container}>
        <div className={`${styles.primary_button} ${styles.pulsate}`} />
        <div className={`${styles.favorites__button} ${styles.pulsate}`} />
      </div>
    </div>
  );
};
