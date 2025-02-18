import classNames from 'classnames';
import styles from './SkeletonProductCard.module.scss';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

interface Props {
  isCategory?: boolean;
}

export const SkeletonProductCard: React.FC<Props> = ({ isCategory }) => {
  let x = 2;

  if (
    (isCategory && window.innerWidth <= 475) ||
    (isCategory && window.innerWidth >= 627 && window.innerWidth <= 790) ||
    (isCategory && window.innerWidth >= 947 && window.innerWidth <= 1043)
  ) {
    x = 1;
  }

  return (
    <div className={classNames(styles.productCardContainer)}>
      <Skeleton className={styles.productImgContainer} />
      <Skeleton className={styles.titleCard} count={x} />
      <div className={styles.priceContainer}>
        <Skeleton className={styles.price} />
      </div>

      <span className={styles.line}></span>

      <div className={styles.productInfo}>
        <div className={styles.productInfoItem}>
          <Skeleton
            className={classNames(styles.productItem, styles.productItemScreen)}
          />

          <Skeleton
            className={classNames(
              styles.productItem,
              styles.productItemScreen1,
            )}
          />
        </div>

        <div className={styles.productInfoItem}>
          <Skeleton
            className={classNames(
              styles.productItem,
              styles.productItemCapacity,
            )}
          />

          <Skeleton
            className={classNames(
              styles.productItem,
              styles.productItemCapacity1,
            )}
          />
        </div>
        <div className={styles.productInfoItem}>
          <Skeleton
            className={classNames(styles.productItem, styles.productItemRAM)}
          />

          <Skeleton
            className={classNames(styles.productItem, styles.productItemRAM1)}
          />
        </div>
      </div>

      <div className={styles.btnContainer}>
        <div className={styles.btnCart}>
          <Skeleton className={styles.btnCartRadius} />
        </div>

        <Skeleton circle={true} className={styles.btnFavorite} />
      </div>
    </div>
  );
};
