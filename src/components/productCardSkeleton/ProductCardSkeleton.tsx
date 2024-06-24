import Skeleton from 'react-loading-skeleton'; // assuming you're using a Skeleton component for placeholders
import styles from './ProductCardSkeleton.module.scss'; // adjust import path as necessary

type Props = {
  cards: number;
};

export const ProductCardSkeleton: React.FC<Props> = ({ cards }) => {
  return (
    <div className={styles.cards}>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.card__img_wrapper}>
              <Skeleton height={192} width={208} className={styles.card__img} />
            </div>

            <Skeleton width={208} height={24} className={styles.card__name} />

            <div className={styles.card__prices}>
              <Skeleton width={60} height={28} />
              <Skeleton width={60} height={28} />
            </div>

            <div className={styles.card__divider}></div>

            <div className={styles.card__informartion}>
              <div className={styles.card__info}>
                <Skeleton width={60} height={16} />
                <Skeleton width={30} height={16} />
              </div>
              <div className={styles.card__info}>
                <Skeleton width={60} height={16} />
                <Skeleton width={30} height={16} />
              </div>
              <div className={styles.card__info}>
                <Skeleton width={60} height={16} />
                <Skeleton width={30} height={16} />
              </div>
            </div>

            <div className={styles.card__buttons}>
              <Skeleton width={100} height={36} />
              <Skeleton width={100} height={36} />
            </div>
          </div>
        ))}
    </div>
  );
};
