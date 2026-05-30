import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardSkeleton.module.scss';
import classNames from 'classnames';

export const CardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={styles.cardSkeleton}>
        <Skeleton className={styles.cardSkeleton__img} />
        <Skeleton className={styles.cardSkeleton__title} />
        <Skeleton className={styles.cardSkeleton__price} />
        <hr />
        <div className={styles.cardSkeleton__infoBlock}>
          <p className={styles.cardSkeleton__infoTitle}>Screen</p>
          <Skeleton className={styles.cardSkeleton__infoText} />
        </div>
        <div className={styles.cardSkeleton__infoBlock}>
          <p className={styles.cardSkeleton__infoTitle}>Capacity</p>
          <Skeleton className={styles.cardSkeleton__infoText} />
        </div>
        <div className={styles.cardSkeleton__infoBlock}>
          <p className={styles.cardSkeleton__infoTitle}>RAM</p>
          <Skeleton className={styles.cardSkeleton__infoText} />
        </div>
        <div className={styles.cardSkeleton__buttons}>
          <button className={classNames(styles.cardSkeleton__cartButton)}>
            Added to cart
          </button>
          <button className={classNames(styles.cardSkeleton__favButton)} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
