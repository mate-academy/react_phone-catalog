import { ImgIcon } from '../../Icon/ImgIcon';
import styles from './DetailCardSkeleton.module.scss';
interface Props {
  classNames?: string;
}

export const DetailCardSkeleton = ({ classNames }: Props) => {
  return (
    <div className={`${styles.container} ${classNames}`}>
      <div className={styles.Illustration}>
        <div className={styles.slides}>
          <div className={`${styles.slide} ${styles.pulsate}`} />
          <div className={`${styles.slide} ${styles.pulsate}`} />
          <div className={`${styles.slide} ${styles.pulsate}`} />
          <div className={`${styles.slide} ${styles.pulsate}`} />
          <div className={`${styles.slide} ${styles.pulsate}`} />
        </div>

        <div className={styles.logo}>
          <ImgIcon />
        </div>
      </div>

      <div className={styles.configurator}>
        <div className={styles.colors}>
          <div className={`${styles.rectangle} ${styles.pulsate}`} />
          <div className={`${styles.rectangle} ${styles.pulsate}`} />
          <div className={`${styles.rectangle} ${styles.pulsate}`} />
          <div className={`${styles.rectangle} ${styles.pulsate}`} />
        </div>

        <hr className={styles.line} />

        <div className={styles.capacity}>
          <div className={`${styles.blok} ${styles.pulsate}`} />
          <div className={`${styles.blok} ${styles.pulsate}`} />
          <div className={`${styles.blok} ${styles.pulsate}`} />
        </div>

        <hr className={styles.line} />

        <div className={`${styles.price} ${styles.pulsate}`} />

        <div className={styles.buttons}>
          <div className={`${styles.primary} ${styles.pulsate}`} />
          <div className={`${styles.favorite} ${styles.pulsate}`} />
        </div>

        <div className={styles.descriptions}>
          <div className={styles.keys}>
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
          </div>

          <div className={styles.keys}>
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
            <div className={`${styles.value} ${styles.pulsate}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
