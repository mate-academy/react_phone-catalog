import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SkeletonCard.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCardItem: React.FC = () => {
  return (
    <li className={styles.card__item}>
      <div className={styles.card__link}>
        <div className={styles.img__placeholder}>
          <Skeleton height={180} width={180} />
        </div>
        <div className={styles.card__item__title}>
          <Skeleton width="90%" height={16} />
          <Skeleton width="60%" height={16} style={{ marginTop: 6 }} />
        </div>
      </div>
      <div className={styles.card__item__price}>
        <Skeleton width={90} height={28} />
      </div>
      <div className={styles.card__line} />
      <ul className={styles['characteristics__list-short']}>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>
            <Skeleton width={50} height={12} />
          </span>
          <span className={styles['characteristic-value']}>
            <Skeleton width={45} height={12} />
          </span>
        </li>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>
            <Skeleton width={55} height={12} />
          </span>
          <span className={styles['characteristic-value']}>
            <Skeleton width={40} height={12} />
          </span>
        </li>
        <li className={styles['characteristics__item-short']}>
          <span className={styles['characteristic-key']}>
            <Skeleton width={40} height={12} />
          </span>
          <span className={styles['characteristic-value']}>
            <Skeleton width={35} height={12} />
          </span>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <div style={{ flex: 1 }}>
          <Skeleton height={40} />
        </div>
        <div style={{ width: 40 }}>
          <Skeleton width={40} height={40} />
        </div>
      </div>
    </li>
  );
};

interface Props {
  cards?: number[];
  count?: number;
  isGrid?: boolean;
}

export const SkeletonCard: React.FC<Props> = ({
  cards,
  count = 4,
  isGrid = false,
}) => {
  const total = cards ? cards.length : count;
  const items = Array.from({ length: total });

  return (
    <ul className={isGrid ? styles.skeleton__grid : styles.skeleton__list}>
      {items.map((_, index) => (
        <SkeletonCardItem key={index} />
      ))}
    </ul>
  );
};
