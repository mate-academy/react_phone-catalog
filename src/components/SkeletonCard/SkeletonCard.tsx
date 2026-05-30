import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonCard.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  cards: number[];
}

export const SkeletonCard: React.FC<Props> = ({ cards }) => {
  return (
    <ul className={styles.skeleton__list}>
      {cards.map((item, index) => (
        <li className={styles.card__item} key={index}>
          <div className={styles.card__link}>
            <Skeleton width={170} height={150}></Skeleton>
            <h4 className={styles.card__item__title}>
              <Skeleton width={200}></Skeleton>
              <Skeleton width={60}></Skeleton>
            </h4>
          </div>
          <span className={styles.card__item__price}>
            <Skeleton width={100} height={40}></Skeleton>
          </span>
          <div className={styles.card__line}></div>
          <ul className={styles['characteristics__list-short']}>
            <li className={styles['characteristics__item-short']}>
              <span className={styles['characteristic-key']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
              <span className={styles['characteristic-value']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
            </li>
            <li className={styles['characteristics__item-short']}>
              <span className={styles['characteristic-key']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
              <span className={styles['characteristic-value']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
            </li>
            <li className={styles['characteristics__item-short']}>
              <span className={styles['characteristic-key']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
              <span className={styles['characteristic-value']}>
                <Skeleton width={50} height={12}></Skeleton>
              </span>
            </li>
          </ul>
          <div className={styles.card__buttons}>
            <Skeleton width={150} height={40}></Skeleton>
            <Skeleton width={40} height={40}></Skeleton>
          </div>
        </li>
      ))}
    </ul>
  );
};
