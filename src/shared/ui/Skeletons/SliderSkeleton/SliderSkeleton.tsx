import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './SliderSkeleton.module.scss';
import { CardSkeleton } from '../CardSkeleton';
import { SkeletonFadeIn } from '@shared/ui/SkeletonFadeIn';

const CARD_COUNT = 4;

export const SliderSkeleton: React.FC = () => (
  <SkeletonFadeIn>
    <div className={styles.productWrapper}>
      <div className={styles.products}>
        <div className={styles.titleWrapper}>
          <Skeleton className={styles.title} height="100%" />
        </div>

        <div className={styles.cards}>
          {Array.from({ length: CARD_COUNT }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  </SkeletonFadeIn>
);
