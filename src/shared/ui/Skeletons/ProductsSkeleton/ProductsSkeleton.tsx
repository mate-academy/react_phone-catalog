import React from 'react';
import styles from './ProductsSkeleton.module.scss';
import { SkeletonFadeIn } from '@shared/ui/SkeletonFadeIn';
import { CardSkeleton } from '../CardSkeleton';

type Props = {
  itemsPerPage: number;
};

export const ProductsSkeleton: React.FC<Props> = ({ itemsPerPage }) => (
  <SkeletonFadeIn className={styles.productsPageSkeleton}>
    <div className={styles.productsPageList}>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <CardSkeleton key={index} className={styles.productsPageCard} />
      ))}
    </div>
  </SkeletonFadeIn>
);
