import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './../ProductCard.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <Skeleton height={192} width={160} />
      </div>

      <div className={styles.title}>
        <Skeleton count={2} />
      </div>

      <div className={styles.group}>
        <Skeleton width={60} height={24} />
        <Skeleton width={40} height={24} />
      </div>

      <div className={styles.info}>
        {[1, 2, 3].map(i => (
          <div key={i} className={styles.info__text}>
            <Skeleton width={80} />
            <Skeleton width={50} />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Skeleton height={40} width={150} />
        <Skeleton height={40} width={40} />
      </div>
    </div>
  );
};
