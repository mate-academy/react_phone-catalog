import { ImgIcon } from '../../Icon/ImgIcon';
import styles from './SmallCardSkeleton.module.scss';

export const SmallCardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img}>
          <ImgIcon />
        </div>

        <div className={`${styles.title} ${styles.pulsate}`}></div>
      </div>

      <div className={`${styles.price} ${styles.pulsate}`}></div>
    </div>
  );
};
