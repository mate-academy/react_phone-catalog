import classNames from 'classnames';

import React from 'react';
import styles from './CardSkeleton.module.scss';
import Skeleton from 'react-loading-skeleton';
import { SkeletonFadeIn } from '@shared/ui/SkeletonFadeIn';
import ImageSkeleton from '@public/img/icons/image-skeleton.svg?react';

type Props = {
  className?: string;
};

export const CardSkeleton: React.FC<Props> = ({ className }) => (
  <SkeletonFadeIn>
    <article className={classNames(styles.card, className)}>
      <div className={styles.cardImageWrapper}>
        <Skeleton className={styles.cardImage} />

        <ImageSkeleton className={styles.cardImageSkeleton} />
      </div>

      <Skeleton className={styles.cardTitle} />

      <div className={styles.cardPrices}>
        <Skeleton width={50} height={31} />

        <Skeleton width={50} height={31} />
      </div>

      <Skeleton height={1} />

      <div className={styles.cardInfo}>
        <div className={styles.cardSpecs}>
          <Skeleton width={43} height={15} />

          <Skeleton width={54} height={15} />
        </div>

        <div className={styles.cardSpecs}>
          <Skeleton width={57} height={15} />

          <Skeleton width={38} height={15} />
        </div>

        <div className={styles.cardSpecs}>
          <Skeleton width={28} height={15} />

          <Skeleton width={28} height={15} />
        </div>
      </div>

      <div className={styles.cardButtons}>
        <div className={styles.cardButtonMain}>
          <Skeleton height={40} />
        </div>

        <div className={styles.cardButtonFavourite}>
          <Skeleton height={40} />
        </div>
      </div>
    </article>
  </SkeletonFadeIn>
);
